'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import useSettings from '@/app/hooks/useSettigs';
import ThemeManager from '@/app/util/ThemeProvideWrapper';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { loading, settings } = useSettings();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            toast.loading(`Searching ${searchQuery}...`);
            router.push(`/query/${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="w-full nav z-50">
            <div className="mx-auto px-4 container">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <img
                            src={settings?.headerLogo}
                            alt="logo"
                            aria-label="logo"
                            className="logo"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-card transition">Home</Link>
                            <Link href="/services" className="text-card transition">Services</Link>
                            <Link href="/about" className="text-card transition">About</Link>
                            <Link href="/contact" className="text-card transition">Contact</Link>
                        </div>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="hidden md:block px-3 py-1 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary text-heading"
                        />

                        {/* Dark Mode Toggle */}
                        {settings && <ThemeManager settings={settings} />}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-2xl">
                                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link href="/" className="block text-card">Home</Link>
                    <Link href="/services" className="block text-card">Services</Link>
                    <Link href="/about" className="block text-card">About</Link>
                    <Link href="/contact" className="block text-card">Contact</Link>
                    {/* Mobile Search */}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="mt-2 w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
