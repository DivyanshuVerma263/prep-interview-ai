'use client'
import { db } from '@/helpers/db';
import { Interview } from '@/helpers/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);


    // Get interview details by inteviewId from database
    const getInterviewDetails = async () => {
        try {
            const result = await db.select().from(Interview)
                .where(eq(Interview.interviewId, params.interviewId));

            // console.log(result[0]);
            // console.log('first', result[0].jsonInterviewResponse);
            const jsonmock = await JSON.parse(result[0].jsonInterviewResponse);
            // console.log('jsonmock',jsonmock);
            // console.log(typeof jsonmock);
            setInterviewQuestions(jsonmock);
            setInterviewData(result[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInterviewDetails();
    }, [params.interviewId]);

    useEffect(() => {
        console.log('interviewData', interviewData);
        console.log('interviewQuestions', interviewQuestions);
    }, [interviewData])

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                    {/* Questions */}
                    <QuestionsSection
                        interviewQuestions={interviewQuestions}
                        activeQuestionIndex={activeQuestionIndex}
                    />


                    {/* Video/Audio Recording */}
                    <RecordAnswerSection
                        interviewQuestions={interviewQuestions}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                        setActiveQuestionIndex={setActiveQuestionIndex}
                    />

            </div>
        </div>
    )
}

export default StartInterview