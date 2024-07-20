'use client'
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/helpers/GeminiAIModal';


function QuestionsPage() {
    const [jobPosition, setJobPosition] = useState(false);
    const [jobDescription, setJobDescription] = useState(false);
    const [jobExperience, setJobExperience] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [questionsAndAnswer, setQuestionsAndAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const getQuestions = async () => {
    //     const result = await db.select().from(Interview);
    //     // .where(eq(Interview.createdBy,user?.primaryEmailAddress?.emailAddress));
    //     // console.log(result.length);
    //     let mergedArray = [];
    //     for (let i = 0; i < result.length; i++) {
    //         const element = await JSON.parse(result[i].jsonInterviewResponse);
    //         mergedArray = [...mergedArray, ...element];
    //     }
    //     // console.log(mergedArray);            
    //     setQuestionsAndAnswers(mergedArray);
    // }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputPrompt = "Job Position: " + jobPosition + ",Job Description: " + jobDescription + ",Years of experience: " + jobExperience + ". For the information provided, please give me "+numberOfQuestions+" interview questions along with answers in JSON format. Give question and answer as field in JSON only."

        try {
            const jsonResponse = await chatSession.sendMessage(inputPrompt);
            const data = jsonResponse.response.text().replace('```json', '').replace(/```[\s\S]*$/, '');
            setQuestionsAndAnswers(JSON.parse(data));
        } 
        catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    
    
    return (
        <div>
            
            <div className='text-2xl py-5 px-2'>
                Practice Questions
            </div>


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
                    <div className='my-3'>
                        <label className='font-bold text-base'>Count of Questions</label>
                        <Input placeholder='Eg. 5' type='number' max='15' required onChange={(e) => setNumberOfQuestions(e.target.value)} className='text-black dark:text-white' />
                    </div>
                </div>

                <div className="flex gap-5 justify-start my-5">
                    {/* <Button variant='ghost' className='hover:bg-destructive' onClick={() => setOpenDialog(false)}>Cancel</Button> */}
                    <Button type='submit' disabled={loading}>
                        {loading ? <><LoaderCircle className='animate-spin' /> Generating from AI</> : 'Get Questions'}
                    </Button>
                </div>

            </form>


            {questionsAndAnswer && questionsAndAnswer.map((item, index) => (
                <>
                    <Collapsible key={index} className='mt-4'>
                        <CollapsibleTrigger className='w-[90%] p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7'>
                            Q{index + 1}. {item.question} <ChevronsUpDown className='h-5 w-5' />
                        </CollapsibleTrigger>
                        <CollapsibleContent >
                            <div className='w-[90%] px-3 py-3 flex flex-col gap-2 bg-secondary rounded-lg '>
                                <h2 className='p-2 border rounded-lg bg-green-100 text-sm text-green-900'><strong>Correct Answer: </strong>{item.answer}</h2>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </>
            ))}

        </div>
    )
}

export default QuestionsPage