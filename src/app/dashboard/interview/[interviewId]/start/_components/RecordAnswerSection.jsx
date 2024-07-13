'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/helpers/GeminiAIModal';
import { db } from '@/helpers/db';
import { UserAnswer } from '@/helpers/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import Link from 'next/link'


function RecordAnswerSection({ interviewQuestions, activeQuestionIndex, interviewData, setActiveQuestionIndex }) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const toggleRecording = () => {
        if (isRecording) {
            stopSpeechToText();
        }
        else {
            startSpeechToText();
        }
    }

    const saveUserAnswer = async () => {

        setLoading(true);

        const feedBackPrompt = "Question: " + interviewQuestions[activeQuestionIndex]?.question + ", User Answer: " + userAnswer + ", evaluate the user answer for the question provided and give us the rating for user answer and feedback as area of improvement if any in just 2 to 3 lines to improve it in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedBackPrompt);
        const data = await result.response.text().replace('```json', '').replace(/```[\s\S]*$/, '');
        // console.log(data);
        const jsonFeedbackResponse = JSON.parse(data);
        console.log(jsonFeedbackResponse);

        const resp = await db.insert(UserAnswer)
            .values({
                interviewIdRef: interviewData?.interviewId,
                question: interviewQuestions[activeQuestionIndex]?.question,
                correctAns: interviewQuestions[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: jsonFeedbackResponse?.feedback,
                rating: jsonFeedbackResponse?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            });
        if (resp) {
            toast('Answer recorded successfully');
            setUserAnswer('');
        }
        setResults([]);
        setLoading(false);

    }

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            saveUserAnswer();
        }
        // if (userAnswer?.length < 10) {
        //     setLoading(false);
        //     toast('Error while saving your answer, please record again.');
        //     return;
        // }
    }, [userAnswer]);

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prev => prev + result?.transcript)
        ))
    }, [results])

    return (
        <div className=' min-h-[90%] flex flex-col items-center justify-center'>

            <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-5 '>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
                <Webcam
                    className='h-72 w-full z-10'
                    mirrored={true}
                />
            </div>

            <Button disabled={loading} variant='outline' className='my-5 text-white font-bold' onClick={toggleRecording}>
                {isRecording ?
                    <h2 className='text-red-600 animate-pulse flex gap-2'>
                        <StopCircle />Stop Recording
                    </h2>
                    :
                    <h2 className='text-primary flex gap-2 items-center'>
                        <Mic /> Record Answer
                    </h2>
                }
            </Button>

            <div className='flex justify-end gap-6 '>
                {activeQuestionIndex > 0 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Prev Question</Button>}
                {activeQuestionIndex != interviewQuestions?.length - 1 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                {activeQuestionIndex == interviewQuestions?.length - 1 &&
                    <Link href={'/dashboard/interview/' + interviewData?.interviewId + '/feedback'}>
                        <Button>End Interview</Button>
                    </Link>}
            </div>

        </div>
    )
}

export default RecordAnswerSection