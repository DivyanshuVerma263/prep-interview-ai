import { Button } from '@/components/ui/button'
import { db } from '@/helpers/db';
import { Interview } from '@/helpers/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview, setInterviewList }) {
  const router = useRouter();

  const deleteInterview = async () => {
    await db.delete(Interview).where(eq(Interview.interviewId, interview.interviewId));
    const dataAfterDeleting = await db.select().from(Interview);
    setInterviewList(dataAfterDeleting);
  }

  return (
    <div className='border shadow-sm rounded-lg p-3'>

      <div className='flex justify-between'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <Trash size={18} className='hover:scale-90 transition-all' onClick={deleteInterview} />
      </div>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-400'>Created At: {interview?.createdAt}</h2>

      <div className='flex justify-between mt-2 gap-5'>
        <Button size='sm' variant='outline' className='w-full' onClick={() => router.push('/dashboard/interview/' + interview?.interviewId + '/feedback')}>Feedback</Button>
        <Button size='sm' className='w-full' onClick={() => router.push('/dashboard/interview/' + interview?.interviewId)}>Start</Button>
      </div>

    </div>
  )
}

export default InterviewItemCard