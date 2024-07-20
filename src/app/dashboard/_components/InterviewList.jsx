'use client'
import { db } from '@/helpers/db';
import { Interview } from '@/helpers/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();

    const getInterviewList = async () => {
        const result = await db.select().from(Interview)
            .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Interview.id));

        setInterviewList(result);
    }

    useEffect(() => {
        user && getInterviewList();
    }, [user]);

    return interviewList && (
        <div>

            <h2 className=' font-medium text-xl'>Previous Interviews</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                {interviewList &&
                    interviewList.map((interview, index) => (
                        <InterviewItemCard
                            key={index}
                            interview={interview}
                            setInterviewList={setInterviewList}
                        />
                    ))}
            </div>

        </div>
    )
}

export default InterviewList