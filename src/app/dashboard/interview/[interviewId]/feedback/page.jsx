'use client'
import { db } from '@/helpers/db'
import { UserAnswer } from '@/helpers/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({ params }) {
    const router = useRouter();
    const [feedbackList, setFeedbackList] = useState([]);


    const getFeedback = async () => {
        const result = await db.select().from(UserAnswer)
            .where(eq(UserAnswer.interviewIdRef, params.interviewId))
            .orderBy(UserAnswer.id);

        setFeedbackList(result);
    }

    useEffect(() => {
        getFeedback();
    }, []);

    return (
        <div className='p-10 '>
            {feedbackList?.length == 0 ?
                <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback found</h2>
                :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations !</h2>
                    <h2 className=' font-bold text-2xl'>Here is your interview feedback</h2>
                    <h2 className='text-primary text-lg my-3'>Your overall interview rating : <strong>7/10</strong></h2>
                    <h2 className='text-sm text-gray-500'>Find below interview questions with your answer, correct answer and feedback for improvement.</h2>

                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='w-[90%] p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7'>
                                Qn{index + 1}. {item.question} <ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent >
                                <div className='w-[90%] px-10 pt-3 pb-5 flex flex-col gap-2 bg-secondary rounded-lg '>
                                    <h2 className='px-2 text-red-500 rounded-lg'><strong>Rating: </strong>{item.rating}/10</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-100 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-100 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-100 text-sm text-blue-800'><strong>Feedback: </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>}
            <Button onClick={() => router.replace('/dashboard')} className='mt-5'>Go Home</Button>
        </div>
    )
}
 
export default Feedback