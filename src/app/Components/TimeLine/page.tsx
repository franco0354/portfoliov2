import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ImageLink } from "@/components/ui/image-link";
import planing1 from '../../assets/img/planing-1.jpg'
import planing2 from '../../assets/img/planing-2.jpg'
import image2 from '../../assets/img/image-2.jpg'
export default function TimelinePage() {
    const data = [
        {
            year: "2026",
            month: "Enrolla",
            content: (
                <div>
                    <p className="text-muted-foreground leading-relaxed text-justify md:text-left">
                        Working as a <strong>Web Developer</strong> at{" "}
                        <strong>ENROLLA</strong>, an early-stage fintech startup focused on building modern financial tools.
                        <span className="block text-sm mt-1 text-neutral-400">
                            April 2026 – Present
                        </span>
                    </p>

                    <ul className="list-disc list-inside sm:list-outside sm:ml-4 text-muted-foreground space-y-1.5 mt-3 text-justify md:text-left text-sm sm:text-base">
                        <li>
                            Building and maintaining data pipelines (Ads → Fivetran → BigQuery → dbt)
                        </li>
                        <li>
                            Designing multi-tenant systems with proper data isolation and security
                        </li>
                        <li>
                            Modeling and transforming data for analytics, reporting, and business insights
                        </li>
                        <li>
                            Developing dashboards and reporting tools using Next.js
                        </li>
                        <li>
                            Implementing secure authentication and authorization with Supabase
                        </li>
                        <li>
                            Optimizing performance across frontend and backend systems
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            year: "2025",
            month: "SnapTrail",
            content: (
                <div className="space-y-6">
                    {/* SnapTrail Section */}
                    <div>
                        <p className="text-muted-foreground leading-relaxed text-justify md:text-left">
                            I am currently <strong>collaborating on projects</strong> at{" "}
                            <a
                                href="https://snaptrail.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-primary transition-colors"
                            >
                                SnapTrail
                            </a>{" "}
                            as a <strong>Full Stack App Developer</strong>, where I build and maintain
                            cross-platform mobile applications using{" "}
                            <strong>React Native</strong> and <strong>Firebase</strong>.
                        </p>

                        <p className="text-muted-foreground my-3 text-justify md:text-left">
                            Key contributions include:
                        </p>

                        <ul className="list-disc list-inside sm:list-outside sm:ml-4 text-muted-foreground space-y-1.5 text-justify md:text-left text-sm sm:text-base">
                            <li>
                                Developed and integrated new features to improve functionality and deliver
                                a smoother, more engaging user experience.
                            </li>
                            <li>
                                Debugged, optimized, and restructured codebases to improve performance,
                                scalability, and long-term maintainability.
                            </li>
                            <li>
                                Mentored and supported new hires through onboarding, code reviews, and
                                hands-on technical guidance.
                            </li>
                            <li>
                                Collaborated with a distributed team using Git and GitHub for version control,
                                pull requests, and CI/CD workflows.
                            </li>
                            <li>
                                Proactively proposed and implemented efficient solutions to complex
                                technical challenges across the product.
                            </li>
                        </ul>
                    </div>

                    {/* Champion Blitz Section */}
                    <div>
                        <p className="mb-2 text-muted-foreground text-justify md:text-left">
                            On April 3, I won the{" "}
                            <strong>Champion Blitz programming competition</strong>, competing against
                            2nd, 3rd, and 4th-year college students and placing first—a milestone that
                            reinforced my passion for problem-solving under pressure.
                        </p>
                        <ImageLink
                            src={image2}
                            alt="Champion Blitz Competition"
                            className="w-full max-w-full object-cover aspect-video rounded-lg"
                            linkText="View Competition Image"
                        />
                    </div>
                </div>
            ),
        },
        {
            year: "2023",
            month: "College Journey",
            content: (
                <div>
                    <p className="mb-2 text-muted-foreground text-justify md:text-left">
                        I began my college journey pursuing a <strong>Bachelor of Science in Information Systems</strong>,
                        where I built a strong foundation in flowcharts, programming fundamentals, and systems thinking.
                        Over time, I expanded into web development with modern frameworks such as{" "}
                        <strong>React</strong>, <strong>Next.js</strong>, and <strong>TypeScript</strong>, combining
                        theory with hands-on projects that prepared me for real-world development work.
                    </p>
                </div>
            ),
        },
        {
            year: "2022",
            month: "Best in Research",
            content: (
                <div>
                    <p className="mb-2 text-muted-foreground text-justify md:text-left">
                        I started learning <strong>web development</strong> in 2021. During senior high school, I deepened
                        my skills and began building personal projects from the ground up. When our capstone research
                        project started, I took an active role in presenting and discussing our work with faculty. Our
                        group was recognized as <strong>Best in Research</strong> in the ICT Strand—a proud moment that
                        confirmed my interest in building thoughtful, well-documented solutions.
                    </p>
                    <ImageLink
                        src={[planing1, planing2]}
                        className="w-full sm:w-auto sm:max-w-xs md:w-56 object-cover aspect-video rounded-lg"
                        alt={["Research Project 1", "Research Project 2"]}
                        linkText="View Research Images"
                    />
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-y-hidden">
            <Timeline data={data} />
        </div>
    );
}
