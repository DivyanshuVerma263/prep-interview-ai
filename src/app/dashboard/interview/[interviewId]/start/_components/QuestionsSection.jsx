import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({ interviewQuestions, activeQuestionIndex }) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else {
            alert('Sorry, Your browser does not support text to speech');
        }
    }


    return interviewQuestions && (
        <div className='h-[90%] p-5 border rounded-lg my-10'>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {interviewQuestions && interviewQuestions.map((question, index) => (
                    <h2 className={`${activeQuestionIndex == index && 'bg-[#3576DF] text-white'} p-2 border border-gray-400 rounded-lg xl:rounded-full text-xs md:text-sm text-center cursor-pointer `}>Question #{index + 1}</h2>
                ))}
                {/*  */}
            </div>

            <h2 className='my-5 text-md md:text-lg'>
                {interviewQuestions[activeQuestionIndex]?.question}
            </h2>

            <Volume2 onClick={() => textToSpeech(interviewQuestions[activeQuestionIndex]?.question)} className='cursor-pointer' />

            <div className='border rounded-lg p-5 bg-blue-100 dark:bg-blue-500 mt-20'>
                <h2 className='flex gap-2 items-center text-primary dark:text-black'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm text-primary dark:text-white my-2'>{process.env.NEXT_PUBLIC_PUBLIC_NOTE}</h2>
            </div>

        </div>
    )
}

export default QuestionsSection