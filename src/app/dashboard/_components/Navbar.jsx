'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

function Navbar() {
    
    const path = usePathname();

    const [nav, setNav] = useState(true);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className='flex sticky top-0 justify-between items-center h-20 px-4 bg-secondary z-50'>

            <div onClick={handleNav} className='visible md:hidden hover:cursor-pointer'>
                {nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
            </div>

            <Image src={'/logo.png'} width={40} height={40} alt="logo" className='ml-2' />

            <ul className='hidden md:flex md:gap-6 lg:gap-12'>
                <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && "text-primary font-bold"}`}>Dashboard</li>
                <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && "text-primary font-bold"}`}>Questions</li>
                <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && "text-primary font-bold"}`}>How it Works?</li>
            </ul>

            <div className={!nav ? 'fixed left-0 top-0 w-[60%] md:w-0 h-full border-r border-r-gray-500 bg-secondary ease-in-out duration-500' : 'hidden'}>
                <ul className='md:hidden uppercase'>
                    <li className={`hover:bg-gray-700 hover:font-bold transition-all cursor-pointer p-6 ${path == '/dashboard' && "text-primary bg-white font-bold"}`}>Dashboard</li>
                    <li className={`hover:bg-gray-700 hover:font-bold transition-all cursor-pointer p-6 ${path == '/dashboard/questions' && "text-primary bg-white font-bold"}`}>Questions</li>
                    <li className={`hover:bg-gray-700 hover:font-bold transition-all cursor-pointer p-6 ${path == '/dashboard/how' && "text-primary bg-white font-bold"}`}>How it Works?</li>
                </ul>
            </div>

            <div>
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar