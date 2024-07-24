'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/helpers/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/helpers/db';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { Interview } from '@/helpers/schema';
import { useRouter } from 'next/navigation';



function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobExperience, setJobExperience] = useState(0);
    const [loading, setLoading] = useState(false);
    const [responseFromGeminiAI, setResponseFromGeminiAI] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputPrompt = "Job Position: " + jobPosition + ",Job Description: " + jobDescription + ",Years of experience: " + jobExperience + ". For the information provided, please give me 5 interview questions along with answers in JSON format. Give question and answer as field in JSON only."

        const jsonResponse = await chatSession.sendMessage(inputPrompt);
        const data = jsonResponse.response.text().replace('```json', '').replace(/```[\s\S]*$/, '');
        setResponseFromGeminiAI(data);

        if (data) {
            const resp = await db.insert(Interview)
                .values({
                    interviewId: uuidv4(),
                    jsonInterviewResponse: data,
                    jobPosition: jobPosition,
                    jobDescription: jobDescription,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YYYY'),
                }).returning({
                    interviewId: Interview.interviewId
                })
            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.interviewId)
            }
        }
        else {
            console.log('Error');
        }
        setLoading(false);
    }

    return (
        <div>

            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={(e) => setOpenDialog(true)}>
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about job you are interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit}>

                                <div>

                                    <h2>Add details about job position, your skills and years of experience</h2>

                                    <div className='mt-7 my-3'>
                                        <label className='font-bold text-base'>Job Position/Job Role</label>
                                        <Input placeholder='Eg. Full Stack Developer' required onChange={(e) => setJobPosition(e.target.value)} className='text-black dark:text-white' />
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-bold text-base'>Job Description/Tech Stack(in short)</label>
                                        <Textarea placeholder='Eg. HTML, React, NextJS' required onChange={(e) => setJobDescription(e.target.value)} className='text-black dark:text-white' />
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-bold text-base'>Years of Experience</label>
                                        <Input placeholder='Eg. 5' type='number' max='50' required onChange={(e) => setJobExperience(e.target.value)} className='text-black dark:text-white' />
                                    </div>

                                </div>

                                
                                <div className="flex gap-5 justify-end">
                                    <Button variant='ghost' className='hover:bg-destructive' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ? <><LoaderCircle className='animate-spin' /> Generating from AI</> : 'Start Interview'}
                                    </Button>
                                </div>


                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}

export default AddNewInterview