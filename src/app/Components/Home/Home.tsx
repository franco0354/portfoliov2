'use client'

import '../Home/Home.style.css'
import '../Home/Home.modern.css'
import Image from 'next/image';
import { TypingText } from '@/components/animate-ui/text/typing';
import { SkillTag } from '@/components/ui/skill-tag';
import { scrollToSection } from '@/lib/scroll';
import profilebackground from '@/app/assets/img/backgroundprofile.jpg';
import {
    SiReact,
    SiNextdotjs,
    SiFirebase,
    SiSupabase,
    SiTypescript,
} from 'react-icons/si';

const dataText = [
    "Frontend Web Developer",
    "Backend Web Developer",
    "Full Stack Web Developer",
];

function Home() {
    return (
        <div className="home-shell">
            <div className="container home mx-auto">
                <div className="home-stage">
                    <div className="home-copy">
                        <p
                            className="home-kicker home-hero-text"
                            data-aos="fade-down"
                            data-aos-delay="100"
                        >
                            <span className="home-availability" aria-hidden="true" />
                            Available for work · Bulacan, PH
                        </p>

                        <h1
                            className="home-display home-hero-text"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Hi! I&apos;m Franco!
                        </h1>

                        <p
                            className="home-role home-hero-subtitle"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <span className="home-role-label">I&apos;m a</span>
                            <TypingText
                                text={dataText}
                                cursor
                                loop={true}
                                className="home-role-typing"
                                cursorClassName="h-[1em] md:h-8"
                            />
                        </p>

                        <p
                            className="home-lead home-hero-bio"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            I craft modern web and mobile applications with React,
                            Next.js, React Native, Firebase, Supabase, and TypeScript.
                            I focus on building fast, scalable products with thoughtful
                            user experiences—from polished interfaces to reliable systems
                            running behind the scenes.
                        </p>

                        <div
                            className="home-actions home-hero-bio"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <a href="#Project" className="home-cta home-cta--primary">
                                View projects
                            </a>
                            <a href="#Contact" className="home-cta home-cta--ghost">
                                Get in touch
                            </a>
                        </div>

                        <div className="inline-talents home-skills">
                            <SkillTag aosDelay={100} className="home-skill-tag home-skill-tag--react" iconClassName="home-skill-icon" icon={<SiReact />}>React</SkillTag>
                            <SkillTag aosDelay={150} className="home-skill-tag home-skill-tag--nextjs" iconClassName="home-skill-icon" icon={<SiNextdotjs />}>Next.js</SkillTag>
                            <SkillTag aosDelay={200} className="home-skill-tag home-skill-tag--react-native" iconClassName="home-skill-icon" icon={<SiReact />}>React Native</SkillTag>
                            <SkillTag aosDelay={250} className="home-skill-tag home-skill-tag--firebase" iconClassName="home-skill-icon" icon={<SiFirebase />}>Firebase</SkillTag>
                            <SkillTag aosDelay={300} className="home-skill-tag home-skill-tag--supabase" iconClassName="home-skill-icon" icon={<SiSupabase />}>Supabase</SkillTag>
                            <SkillTag aosDelay={350} className="home-skill-tag home-skill-tag--typescript" iconClassName="home-skill-icon" icon={<SiTypescript />}>TypeScript</SkillTag>
                        </div>
                    </div>

                    <div
                        className="home-visual"
                        data-aos="fade-up"
                        data-aos-delay="350"
                    >
                        <div className="home-visual-frame">
                            <Image
                                src={profilebackground}
                                alt="Franco at his desk"
                                fill
                                priority
                                sizes="(max-width: 858px) 70vw, 22rem"
                                className="home-visual-photo rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="home-scroll-slot"
                data-aos="fade-up"
                data-aos-delay="700"
            >
                <a
                    href="#About"
                    className="home-scroll"
                    aria-label="Scroll to about"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('#About');
                    }}
                >
                    <span className="home-scroll-line" aria-hidden="true" />
                    <span className="home-scroll-label">Scroll</span>
                </a>
            </div>
        </div>
    );
}

export default Home;
