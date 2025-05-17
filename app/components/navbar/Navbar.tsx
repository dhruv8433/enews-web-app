'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import useSettings from '@/app/hooks/useSettigs';
import ThemeManager from '@/app/util/ThemeProvideWrapper';

const Navbar = () => {
    const { loading, settings } = useSettings();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="w-full nav z-50">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <img src={settings?.headerLogo} alt="logo" aria-label='logo' className='logo' />
                    </Link>

                    <div className="flex items-center gap-2">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-heading transition">
                                Home
                            </Link>
                            <Link href="/services" className="text-heading transition">
                                Services
                            </Link>
                            <Link href="/about" className="text-heading transition">
                                About
                            </Link>
                            <Link href="/contact" className="text-heading transition">
                                Contact
                            </Link>
                        </div>

                        {/* Dark Mode Toggle */}

                        {settings && <ThemeManager settings={settings} />}
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-2xl ">
                                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <Link href="/" className="block py-2 text-heading">
                        Home
                    </Link>
                    <Link href="/popular" className="block py-2 text-heading">
                        Popular
                    </Link>
                    <Link href="/about" className="block py-2 text-heading">
                        About
                    </Link>
                    <Link href="/contact" className="block py-2 text-heading">
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
