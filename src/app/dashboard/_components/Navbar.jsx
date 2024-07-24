'use client'
import ModeToggle from '@/components/ThemeToggle'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
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

            <Link href={'/'}>
                <Image src={'/logo.png'} width={40} height={40} alt="logo" className='ml-12 sm:ml-2' />
            </Link>

            <ul className='hidden md:flex md:gap-6 lg:gap-12'>
                <Link href={'/'}>
                    <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/' && "text-primary font-bold"}`}>Home</li>
                </Link>

                <Link href={'/dashboard'}>
                    <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && "text-primary font-bold"}`}>Dashboard</li>
                </Link>

                <Link href={'/practice'}>
                    <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/practice' && "text-primary font-bold"}`}>Practice</li>
                </Link>
            </ul>

            <div className={!nav ? 'fixed left-0 top-0 w-[60%] md:w-0 h-full border-r border-r-gray-500 bg-secondary ease-in-out duration-500' : 'hidden'}>
                <ul className='md:hidden uppercase'>
                    <Link href={'/'}>
                        <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/' && "text-primary font-bold"}`}>Home</li>
                    </Link>

                    <Link href={'/dashboard'}>
                        <li className={`hover:bg-gray-700 hover:font-bold transition-all cursor-pointer p-6 ${path == '/dashboard' && "text-primary bg-white font-bold"}`}>Dashboard</li>
                    </Link>

                    <Link href={'/practice'}>
                        <li className={`hover:bg-gray-700 hover:font-bold transition-all cursor-pointer p-6 ${path == '/practice' && "text-primary bg-white font-bold"}`}>Practice</li>
                    </Link>
                </ul>
            </div>

            <div className='flex gap-3'>
                <ModeToggle />
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar