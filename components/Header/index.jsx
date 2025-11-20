"use client"
import React, { useState, useRef, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import {
    FaGithub,
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaReddit,
    FaDiscord,
    FaLinkedin,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { config } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_ITEMS = config.NAV_ITEMS;

const NavLink = ({ href, label, isMobile = false }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className="relative"
        >
            <motion.span
                className={`relative ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-2'} text-foreground hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {label}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-secondary/30  rounded-lg backdrop-blur-sm"
                        layoutId="activeNavBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        style={{
                            zIndex: -1
                        }}
                    />
                )}
            </motion.span>
        </Link>
    );
};

const Logo = ({ isMobile = false }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
            <motion.div
                whileHover={{ opacity: 0.5 }}
                whileTap={{ scale: 0.95 }}
            >
                <Image
                    src="/logo.png"
                    width={2000}
                    height={2000}
                    alt='logo'
                    className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full`}
                />
            </motion.div>
            <motion.span
                className={`text-foreground font-semibold ${isMobile ? 'hidden' : 'text-base sm:text-lg'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <span className="hidden sm:inline">{config.developer.name} Kumar</span>
            </motion.span>
        </Link>
    </motion.div>
);

const Navigation = ({ isMobile = false, onLinkClick }) => (
    <motion.nav
        className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex space-x-2"}
        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0 : 0.3, duration: 0.5 }}
    >
        {NAV_ITEMS.map((item, index) => (
            <motion.div
                key={item.href}
                initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: isMobile ? index * 0.1 : 0.1 * index }}
                onClick={onLinkClick}
            >
                <NavLink {...item} isMobile={isMobile} />
            </motion.div>
        ))}
    </motion.nav>
);

/**
 * ContactButton (desktop hover + click with delay; mobile compact kept)
 * - wrapper has overflow-visible so dropdown doesn't get clipped
 * - dropdown positioned with top-full (below the button) to avoid layout shifts
 */
const ContactButton = ({ isMobile = false, openSocials, setOpenSocials }) => {
    const closeTimer = useRef(null);

    useEffect(() => {
        return () => {
            if (closeTimer.current) {
                clearTimeout(closeTimer.current);
                closeTimer.current = null;
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setOpenSocials(true);
    };

    const handleMouseLeave = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setOpenSocials(false);
            closeTimer.current = null;
        }, 160);
    };

    // Mobile compact button (kept for places where mobile button is desired)
    if (isMobile) {
        return (
            <motion.div
                className="w-full flex justify-center mt-4"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Button
                    onClick={() => setOpenSocials && setOpenSocials((prev) => !prev)}
                    aria-expanded={openSocials ? "true" : "false"}
                    className="w-full rounded-2xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm sm:text-base px-4 py-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <span>Socials</span>
                    <span className="ml-2">{openSocials ? <FaChevronUp /> : <FaChevronDown />}</span>
                </Button>
            </motion.div>
        );
    }

    // Desktop: wrapper listens for enter/leave so both button and dropdown keep menu open
    return (
        <motion.div
            className="flex items-center space-x-6 overflow-visible" // make sure it's visible
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-max">
                <Button
                    onClick={() => setOpenSocials && setOpenSocials((prev) => !prev)}
                    aria-expanded={openSocials ? "true" : "false"}
                    className="rounded-2xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 cursor-pointer"
                >
                    <span>Socials</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${openSocials ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </Button>

                {openSocials && (
                    <div
                        className="absolute right-0 top-full mt-2 bg-popover text-popover-foreground rounded-xl shadow-lg py-2 min-w-[220px] z-50 max-h-64 overflow-auto border border-border"
                        role="menu"
                        aria-label="Social links"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ transformOrigin: 'top right' }}
                    >
                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://github.com/Abhijeetjais98" target="_blank" rel="noreferrer">
                            <FaGithub /> <span>GitHub</span>
                        </a>

                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://www.instagram.com/abhtzz/" target="_blank" rel="noreferrer">
                            <FaInstagram /> <span>Instagram</span>
                        </a>

                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://www.facebook.com/profile.php?id=100034254683809" target="_blank" rel="noreferrer">
                            <FaFacebook /> <span>Facebook</span>
                        </a>

                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://x.com/avijeetjais09" target="_blank" rel="noreferrer">
                            <FaTwitter /> <span>X (Twitter)</span>
                        </a>

                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://www.reddit.com/user/ZEUS_A98/" target="_blank" rel="noreferrer">
                            <FaReddit /> <span>Reddit</span>
                        </a>

                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://discord.com/users/1434161237037547591" target="_blank" rel="noreferrer">
                            <FaDiscord /> <span>Discord</span>
                        </a>

                        <a className="px-4 py-2 flex gap-2 items-center hover:bg-accent hover:text-accent-foreground cursor-pointer" href="https://www.linkedin.com/in/abhijeetjais13/" target="_blank" rel="noreferrer">
                            <FaLinkedin /> <span>LinkedIn</span>
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

/**
 * MobileSocialsInline
 * - Renders inline inside mobile menu flow (just after Contact link in the nav flow).
 * - When opened, options appear directly below Socials row and push content down.
 * - Items are clickable and dark-styled to match mobile panel.
 */
const MobileSocialsInline = ({ openSocials, setOpenSocials, closeMobileMenu }) => {
    return (
        <div className="w-full">
            <button
                onClick={() => setOpenSocials(!openSocials)}
                aria-expanded={openSocials ? "true" : "false"}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">🔗</span>
                    <span>Socials</span>
                </div>

                <div className="text-muted-foreground">
                    {openSocials ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </button>

            {openSocials && (
                <div className="mt-2 pl-3 pr-2 flex flex-col gap-1 z-40">
                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://github.com/Abhijeetjais98"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaGithub /> <span>GitHub</span>
                    </a>

                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://www.instagram.com/abhtzz/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaInstagram /> <span>Instagram</span>
                    </a>

                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://www.facebook.com/profile.php?id=100034254683809"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaFacebook /> <span>Facebook</span>
                    </a>

                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://x.com/avijeetjais09"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaTwitter /> <span>X (Twitter)</span>
                    </a>

                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://www.reddit.com/user/ZEUS_A98/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaReddit /> <span>Reddit</span>
                    </a>

                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://discord.com/users/1434161237037547591"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaDiscord /> <span>Discord</span>
                    </a>

                    <a
                        className="px-3 py-2 flex gap-3 items-center rounded text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        href="https://www.linkedin.com/in/abhijeetjais13/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMobileMenu}
                    >
                        <FaLinkedin /> <span>LinkedIn</span>
                    </a>
                </div>
            )}
        </div>
    );
};

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openSocials, setOpenSocials] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setOpenSocials(false);
    };

    return (
        <>
            <motion.header
                className="py-4 sm:py-6 md:py-9 z-50 text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto flex items-center justify-between md:px-64 px-4 sm:px-6">
                    <Logo />
                    <Navigation />
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <ContactButton openSocials={openSocials} setOpenSocials={setOpenSocials} />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiMenu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                            onClick={closeMobileMenu}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-64 bg-background/95 backdrop-blur-md border-l border-border z-50 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col h-full p-6">
                                {/* Mobile Logo */}
                                <div className="mb-8">
                                    <Logo isMobile={true} />
                                </div>

                                {/* Mobile Navigation */}
                                <div className="flex-1">
                                    <Navigation isMobile={true} onLinkClick={closeMobileMenu} />

                                    {/* Socials inline placed right after the nav flow (no duplicate Contact) */}
                                    <div className="mt-2">
                                        <MobileSocialsInline openSocials={openSocials} setOpenSocials={setOpenSocials} closeMobileMenu={closeMobileMenu} />
                                    </div>
                                    <div className="mt-4 px-3">
                                        <div className="flex items-center justify-between text-muted-foreground">
                                            <span>Theme</span>
                                            <ThemeToggle />
                                        </div>
                                    </div>
                                </div>

                                {/* small spacer or optional footer actions */}
                                <div className="mt-6">
                                    {/* intentionally left empty */}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
