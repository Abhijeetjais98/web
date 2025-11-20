'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiCode } from 'react-icons/hi';
import { FaAws, FaLinux, FaGithub, FaGitAlt, FaJava } from "react-icons/fa";
import { SiKubernetes, SiGo, SiAzuredevops, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";
import { MdOutlinePsychology } from "react-icons/md"; // For Prompt Engineering

const skills = [
    { name: "Golang", icon: <SiGo className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1" },
    { name: "Linux", icon: <FaLinux className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "Kubernetes", icon: <SiKubernetes className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "AWS", icon: <FaAws className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 sm:row-span-2 row-span-1" },
    { name: "Azure", icon: <SiAzuredevops className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1" },
    { name: "HTML", icon: <SiHtml5 className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "CSS", icon: <SiCss3 className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "Java", icon: <FaJava className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "JavaScript", icon: <SiJavascript className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "GitHub", icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1" },
    { name: "Git", icon: <FaGitAlt className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
    { name: "Prompt Engineering", icon: <MdOutlinePsychology className="w-5 h-5 sm:w-6 sm:h-6" />, size: "col-span-1 row-span-1" },
];

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const SkillsShowcase = () => {
    return (
        <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="w-full mt-20"
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <motion.div
                    variants={itemAnimation}
                    className="flex items-center gap-2 mb-8 sm:mb-12 justify-center"
                >
                    <div className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-primary backdrop-blur-sm shadow-lg">
                        <HiCode className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <span className="text-xs sm:text-sm font-semibold text-primary">Tech Stack</span>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerAnimation}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full"
                    style={{
                        gridAutoRows: 'minmax(90px, auto)',
                        gridAutoFlow: 'row dense'
                    }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            variants={itemAnimation}
                            className={`relative group ${skill.size}`}
                        >
                            <div
                                className="
                                bg-card
                                border-border
                                border 
                                p-2.5 sm:p-4 md:p-6
                                rounded-lg sm:rounded-xl md:rounded-2xl
                                backdrop-blur-md 
                                cursor-default
                                relative overflow-hidden
                                h-full
                                w-full
                                min-h-[90px] sm:min-h-[120px]
                                flex flex-col items-center justify-center
                                box-border
                                shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)]
                                transition-all duration-300
                                group-hover:border-primary/50
                                group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.1),0_0_20px_rgba(var(--primary),0.1)]
                            "
                                style={{ height: '100%' }}
                            >
                                {/* Shiny overlay effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent shiny-sweep" />
                                </div>

                                {/* Glossy shine effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent rounded-t-2xl" />
                                </div>

                                <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full z-10">
                                    {/* Icon container */}
                                    <div className="relative">
                                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-secondary border border-border flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/20 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.15)]">
                                            <div className="text-foreground drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                {skill.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skill name */}
                                    <div className="flex flex-col items-center gap-0.5 sm:gap-1 w-full px-0.5 sm:px-1">
                                        <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-card-foreground text-center tracking-tight transition-all duration-300 group-hover:text-primary break-words leading-tight">
                                            {skill.name}
                                        </span>
                                        <div className="w-5 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full transition-all duration-300 group-hover:via-primary/80" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SkillsShowcase;

