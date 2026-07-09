'use client'

import '../Home/Home.style.css'
import '../Home/Home.modern.css'
import { TypingText } from '@/components/animate-ui/text/typing';
import { SkillTag } from '@/components/ui/skill-tag';
import { scrollToSection } from '@/lib/scroll';
import {
    SiReact,
    SiNextdotjs,
    SiFirebase,
    SiSupabase,
    SiTypescript,
} from 'react-icons/si';

const dataText = [
    "FrontEnd Web Developer",
    "BackEnd Web Developer",
    "Full Stack Web Developer",
];

function Home() {
    return (
        <div className="home-shell">
            <div className="container home mx-auto">
                <div className="home-stage">
                    <div className="home-copy">
                        <p className="home-kicker home-hero-text">
                            <span className="home-availability" aria-hidden="true" />
                            Available for work · Bulacan, PH
                        </p>

                        <h1 className="home-display home-hero-text">
                            Franco
                        </h1>

                        <p className="home-role home-hero-subtitle">
                            <span className="home-role-label">I build as a</span>
                            <TypingText
                                text={dataText}
                                cursor
                                loop={true}
                                className="home-role-typing"
                                cursorClassName="h-[1em] md:h-8"
                            />
                        </p>

                        <p className="home-lead home-hero-bio">
                            Modern web and mobile apps with React, Next.js,
                            React Native, Firebase, Supabase, and TypeScript—
                            fast, scalable, and focused on real user experience.
                        </p>

                        <div className="home-actions home-hero-bio">
                            <a href="#Project" className="home-cta home-cta--primary">
                                View projects
                            </a>
                            <a href="#Contact" className="home-cta home-cta--ghost">
                                Get in touch
                            </a>
                        </div>

                        <div className="inline-talents home-skills">
                            <SkillTag delay={1} className="home-skill-tag" icon={<SiReact />}>React</SkillTag>
                            <SkillTag delay={2} className="home-skill-tag" icon={<SiNextdotjs />}>Next.js</SkillTag>
                            <SkillTag delay={3} className="home-skill-tag" icon={<SiReact />}>React Native</SkillTag>
                            <SkillTag delay={4} className="home-skill-tag" icon={<SiFirebase />}>Firebase</SkillTag>
                            <SkillTag delay={4} className="home-skill-tag" icon={<SiSupabase />}>Supabase</SkillTag>
                            <SkillTag delay={4} className="home-skill-tag" icon={<SiTypescript />}>TypeScript</SkillTag>
                        </div>
                    </div>
                </div>
            </div>

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
    );
}

export default Home;
