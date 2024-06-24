import React, { useState } from 'react';
import { NavItems } from '../data';
import { X , Menu } from 'lucide-react';

const Navbar = () => {
    
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    return (
        <header>
            <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
                <div className='container px-4 mx-auto relative lg:text-sm'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center flex-shrink-0'>
                            <span className='text-xl tracking-tight'>LOGO</span>
                        </div>
                        <ul className='hidden lg:flex ml-14 space-x-12'>
                            {
                                NavItems.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.href}>{item.label}</a>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className='hidden lg:flex justify-center space-x-12 items-center'>
                            <a href='#' className='py-2 px-3 border rouned-md'>
                                Login
                            </a>
                            <a href="#" className='bg-gradient-to-r from-green-500 to-green-800 py-2 px-3 rouned-md'>
                                Registrar
                            </a>
                        </div>
                        <div className='lg:hidden md:flex flex-col justify-end'>
                            <button onClick={toggleNavbar}>
                                {mobileDrawerOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                    {
                        mobileDrawerOpen && (
                            <div className='"fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden'>
                                <ul>
                                    {
                                        NavItems.map((item, index) => (
                                            <li key={index} className='py-4'>
                                                <a href={item.href}>{item.label}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="flex space-x-6">
                                    <a href="#" className='py-2 px-3 border rounded-md'>
                                        Login
                                    </a>
                                    <a href='#' className='py-2 px-3 border rounded-md bg-gradient-to-r from-green-500 to-green-800'>
                                        Registrar
                                    </a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;