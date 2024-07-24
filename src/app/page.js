'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import ModeToggle from "@/components/ThemeToggle";

export default function Home() {
  const { user } = useUser();
  const frequentlyAskedQuestions = [
    {
      question: "How do I get started?",
      answer: "Simply sign up and move to dashboard, enter your job details and experience, and start practicing with customized questions immediately."
    },
    {
      question: "How does the AI customize interview questions for me?",
      answer: "Our AI analyzes your job role, job description, and years of experience to generate relevant and targeted interview questions."
    },
    {
      question: "Can I practice questions for different job roles?",
      answer: "Yes, you can select different job roles to receive specific questions tailored to each position."
    },
    {
      question: "Are the interview questions updated regularly?",
      answer: "Yes, our database is continuously updated to ensure you get the most current and relevant questions."
    },
    {
      question: "Can I get feedback on my answers?",
      answer: "Yes, our AI provides detailed feedback on your answers to help you improve."
    }];

  return (
    <main className="flex flex-col w-full h-max">

      {/* Navbar */}

      <div className="h-16 w-full flex justify-between items-center p-2 bg-secondary mb-5 sticky top-0">
        <Link href={'/'}>
          <Image src={'/logo.png'} width={40} height={40} alt="logo" className='ml-2' />
        </Link>
        {!user ?
          <div className="flex gap-1 sm:gap-3 lg:gap-3">
            <div>
              <ModeToggle />
            </div>
            <Link href={'/dashboard'}>
              <Button className='hidden sm:block bg-primary'>Dashboard</Button>
            </Link>
            <Link href={'/sign-in'}>
              <Button variant='ghost' className='hover:bg-primary-foreground dark:hover:bg-gray-600'>Log In</Button>
            </Link>
            <Link href={'/sign-up'}>
              <Button>Sign Up</Button>
            </Link>
          </div>
          :
          <div className="flex justify-center gap-3 ">
            <ModeToggle />
            <Link href={'/dashboard'}>
              <Button className='bg-primary'>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        }
      </div>


      
      {/* main section */}

      <div className="flex flex-col sm:flex-row-reverse justify-center items-center sm:items-start mb-5">
        <div className="flex flex-col items-center justify-center p-2">
          <div className="mt-5 text-4xl md:text-5xl lg:text-7xl">
            Welcome to
          </div>
          <div className="my-3 text-4xl md:text-5xl lg:text-7xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            <strong>
              Prep Interview AI
            </strong>
          </div>
          <div className="px-5 py-3 text-center md:text-xl md:mx-28 lg:text-2xl">
            AI-Powered Interview Prep: Tailored for Your Role, Description, and Experience.
          </div>

          <div className=" inline-flex items-center justify-center w-full">
            <hr className="w-[80%] h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>

          <div className="md:flex md:flex-row-reverse md:justify-evenly">
            <div className="md:w-1/2 flex justify-center items-center p-5 ">
              <Image src={'/landing_image.png'} height={288} width={288} alt='logo' className="md:w-full md:h-full my-5 rounded-lg shadow-xl dark:shadow-lg dark:shadow-slate-300" />
            </div>
            <div className="md:w-1/2 px-5 lg:px-16 py-3 flex justify-center items-center text-center md:text-xl lg:text-2xl ">
              Get ready for your interview with our AI tool that customizes practice based on your job role, description, and experience.
            </div>
          </div>
        </div>
      </div>


      {/* Banner */}

      <div className="w-full min-h-96 p-6 md:p-12 lg:p-24 bg-primary text-white">
        <h2 className="text-[26px] xl:text-[34px] px-2">
          Build the career you deserve
        </h2>

        <h3 className="ml-2 text-[18px] md:text-[22px] lg:text-[26px] mt-10">Practice Questions</h3>
        <div className="md:flex md:flex-row md:justify-evenly mb-16">
          <div className="md:w-[60%] flex justify-center items-center p-2 ">
            <Image src={'/first_pic.png'} height={288} width={288} alt='logo' className="md:w-full md:h-full rounded-lg shadow-xl dark:shadow-lg dark:shadow-slate-300" />
          </div>
          <div className="md:w-1/2 md:px-5 lg:px-16 flex justify-center items-center text-center md:text-lg lg:text-2xl">
            Access customized practice questions for your specific job role and experience.
          </div>
        </div>

        <h3 className="ml-2 md:mr-5 text-[18px] md:text-[22px] lg:text-[26px] md:text-end">Webcam and Microphone setup</h3>
        <div className="md:flex md:flex-row-reverse md:justify-evenly mb-16">
          <div className="md:w-[60%] flex justify-center items-center p-2 ">
            <Image src={'/third_pic.png'} height={288} width={288} alt='logo' className="md:w-full md:h-full rounded-lg shadow-xl dark:shadow-lg dark:shadow-slate-300" />
          </div>
          <div className="md:w-1/2 md:px-5 lg:px-16 flex justify-center items-center text-center md:text-lg lg:text-2xl ">
            Set up your webcam and microphone for clear video and audio during your interview.
          </div>
        </div>

        <h3 className="ml-2 text-[18px] md:text-[22px] lg:text-[26px]">Interview Questions</h3>
        <div className="md:flex md:flex-row md:justify-evenly mb-10 md:mb-6">
          <div className="md:w-[60%] flex justify-center items-center p-2 ">
            <Image src={'/second_pic.png'} height={288} width={288} alt='logo' className="md:w-full md:h-full rounded-lg shadow-xl dark:shadow-lg dark:shadow-slate-300" />
          </div>
          <div className="md:w-1/2 md:px-5 lg:px-16 flex justify-center items-center text-center md:text-lg lg:text-2xl ">
            Practice top interview questions customized to your job role and experience.
          </div>
        </div>


        <div className="p-5 text-end md:text-start">
          <Link href={'/dashboard'}>
            <button className='w-40 bg-cyan-500 rounded-lg p-2'>Dashboard</button>
          </Link>
        </div>
      </div>


      {/* Frequently asked questions */}

      <div className="w-full min-h-96 p-6 ">
        <h2 className="mt-2 md:mx-6 md:mt-4 lg:mx-16 lg:mt-12 text-[26px] xl:text-[34px]">
          Frequently Asked Questions
        </h2>

        {frequentlyAskedQuestions.map((item, index) => (
          <div className="md:flex md:flex-row md:justify-evenly mt-8 mb-12" key={index}>
            <div className="md:w-1/2 md:px-5 lg:px-16 text-[22px] md:text-lg lg:text-2xl">
              {item.question}
            </div>
            <div className="md:w-1/2 md:px-5 lg:px-10 text-[16px] md:border-l-2">
              {item.answer}
            </div>
          </div>
        ))}

      </div>

    </main>
  );
}
