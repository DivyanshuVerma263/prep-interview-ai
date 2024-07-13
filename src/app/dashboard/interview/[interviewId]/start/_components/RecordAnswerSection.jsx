import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';


function RecordAnswerSection() {
    const [userAnswer,setUserAnswer]=useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prev=>prev+result?.transcript)
        ))
    },[results])

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 '>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
                <Webcam
                    // onUserMedia={() => setEnableCamera(true)}
                    // onUserMediaError={() => setEnableCamera(false)}
                    // style={{ height: 450, width: 450 }}
                    className='h-72 w-full z-10'
                    mirrored={true}
                />
            </div>

            <Button variant='outline' className='my-10 text-white font-bold' onClick={isRecording?stopSpeechToText:startSpeechToText}>
                {isRecording?
                <h2 className='text-red-600 flex gap-2'>
                    <Mic/>Stop Recording
                </h2>
                :
                'Record Answer'
                }
            </Button>
            <Button onClick={()=>console.log(userAnswer)}> Show Answer </Button>
        </div>
    )
}

export default RecordAnswerSection