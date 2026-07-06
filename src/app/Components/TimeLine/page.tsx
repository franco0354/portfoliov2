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
                    <p className="text-muted-foreground leading-relaxed">
                        <strong>Web Developer</strong> at{" "}
                        <strong>ENROLLA</strong> (early-stage fintech startup)
                        <span className="block text-sm mt-1 text-neutral-400 dark:text-neutral-500">
                            April 2026 – Present
                        </span>
                    </p>

                    <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-1.5 mt-3">
                        <li>
                            Building and maintaining data pipelines (Ads → Fivetran → BigQuery → dbt)
                        </li>
                        <li>
                            Designing multi-tenant systems with proper data isolation
                        </li>
                        <li>
                            Data modeling and transformation for analytics and reporting
                        </li>
                        <li>
                            Developing dashboards and reporting tools using Next.js
                        </li>
                        <li>
                            Implementing secure authentication with Supabase
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
            month: "SnapTrail / Champion Blitz",
            content: (
                <div className="space-y-6">
                    {/* SnapTrail Section */}
                    <div>
                        <p className="text-muted-foreground leading-relaxed">
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

                        <p className="text-muted-foreground my-3">
                            My main contributions include:
                        </p>

                        <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-1.5">
                            <li>
                                Developed and integrated new features to enhance functionality and deliver
                                a smoother, more engaging user experience.
                            </li>
                            <li>
                                Debugged, optimized, and restructured codebases to improve performance,
                                scalability, and maintainability.
                            </li>
                            <li>
                                Mentored and supported new hires through onboarding, code reviews, and
                                hands-on technical guidance.
                            </li>
                            <li>
                                Collaborated with a distributed team using Git/GitHub for version control,
                                pull requests, and CI/CD integration.
                            </li>
                            <li>
                                Proactively proposed and implemented efficient solutions to complex
                                technical challenges.
                            </li>
                        </ul>
                    </div>

                    {/* Champion Blitz Section */}
                    <div>
                        <p className="mb-2 text-muted-foreground">
                            On April 3, I became the{" "}
                            <strong>champion in a blitz programming competition</strong>. I
                            competed against 2nd, 3rd, and 4th-year college students and managed
                            to defeat them.
                        </p>
                        <ImageLink
                            src={image2}
                            alt="Champion Blitz Competition"
                            className="object-cover aspect-video rounded-lg"
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
                    <p className=" mb-2   text-muted-foreground">
                        I began my college journey pursuing a <strong>Bachelor of Science in Information Systems</strong>,
                        where I gained foundational knowledge in flowcharts and programming fundamentals, and later
                        expanded into web development using frameworks such as <strong>React, Next.js,</strong> and <strong>TypeScript</strong>.
                    </p>
                </div>
            ),
        },
        {
            year: "2022",
            month: "Best in Research",
            content: (
                <div>
                    <p className=" mb-2   text-muted-foreground">
                        I started learning <strong>web development</strong> in 2021. During senior high school, I deepened my knowledge and began building my own projects. When our capstone project started,
                        I actively presented and discussed my work with my teacher. Our group was also recognized as the <strong>Best in Research</strong> in the ICT Strand.
                    </p>
                    <ImageLink
                        src={[planing1, planing2]}
                        className="md:w-56 object-cover aspect-video rounded-lg"
                        alt={["Research Project 1", "Research Project 2"]}
                        linkText="View Research Images"
                    />
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
