'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/helpers/db'
import { Interview } from '@/helpers/schema'
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function InterviewPage({ params }) {

    const [interviewData, setInterviewData] = useState(null);
    const [enableCamera, setEnableCamera] = useState(false);


    // Get interview details by inteviewId from database
    const getInterviewDetails = async () => {
        try {
            const result = await db.select().from(Interview)
                .where(eq(Interview.interviewId, params.interviewId));

            setInterviewData(result[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInterviewDetails();
    }, [params.interviewId]);

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let&apos;s Get Started</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-5 gap-5'>

                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2 className='text-lg'><strong>Job Position/Job Role: </strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDescription}</h2>
                        <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
                    </div>

                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 dark:bg-transparent'>
                        <h2 className='flex gap-2 items-center text-yellow-500'>
                            <Lightbulb className='dark:text-noteyellow' />
                            <strong>Note:</strong>
                        </h2>
                        <h2 className='mt-3 text-yellow-500'>Enable Video Web Cam and Microphone to start your AI generated Interview. It consists of 5 questions which you can answer and on completion of the interview, you get the feedback on the basis of your answers. NOTE: We never record your video. You can disable your webcam at any time if you want. </h2>
                    </div>

                </div>


                <div >
                    {enableCamera ?
                        <Webcam
                            onUserMedia={() => setEnableCamera(true)}
                            onUserMediaError={() => setEnableCamera(false)}
                            className='h-72 w-full my-7'
                            mirrored={true}
                        />
                        : 
                        <>
                            <WebcamIcon className='h-72 w-full p-20 bg-secondary rounded-lg border my-7' />
                        </>
                    }

                    <Button className='w-full ' onClick={() => setEnableCamera(!enableCamera)}>
                        {!enableCamera ? "Enable Webcam and Microphone" : "Disable Webcam"}
                    </Button>

                </div>

            </div>


            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
                    <Button>Start Interview</Button>
                </Link>
            </div>

        </div>
    )
}

export default InterviewPage