"use client";

import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    CarouselNext,
    CarouselPrevious,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/ui/extension/carousel";
import { photoData } from "./About-data";
import { TextAnimate } from "@/components/magicui/text-animate";
import Image from "next/image";
import TextHeader from "@/components/text-header";
import {
    SiCss3,
    SiTypescript,
    SiVercel,
    SiNodedotjs,
    SiGit,
    SiGithub,
    SiFirebase,
    SiNextdotjs,
    SiJavascript,
    SiHtml5,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiNotion,
    SiSupabase,
    SiGooglebigquery,
    SiResend,
    SiUnity,
} from "react-icons/si";
import { SiFivetran, SiZustand } from "@/components/icons/brand-icons";
import { FileCode2, Layers, MessageSquareText, ShieldCheck } from "lucide-react";
import "./About.modern.css";
import { SkillTag } from "@/components/ui/skill-tag";
import { useLayoutEffect, useRef, useState } from "react";

/** Base: top-left + top-right with half left/right sides. Hover completes bottom half + bottom edge. */
function AboutDrawBorder({ radius = 8 }: { radius?: number }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [box, setBox] = useState({ w: 0, h: 0 });

    useLayoutEffect(() => {
        const parent = svgRef.current?.parentElement;
        if (!parent) return;

        const update = () => {
            const { width, height } = parent.getBoundingClientRect();
            setBox({
                w: Math.max(0, Math.round(width * 100) / 100),
                h: Math.max(0, Math.round(height * 100) / 100),
            });
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(parent);
        return () => observer.disconnect();
    }, []);

    const pad = 1.5;
    const w = Math.max(0, box.w - pad * 2);
    const h = Math.max(0, box.h - pad * 2);
    const x = pad;
    const y = pad;
    const r = Math.min(radius, w / 2, h / 2);
    const cx = x + w / 2;
    const bottom = y + h;
    const right = x + w;
    // Left/right sides only go halfway down (bottom half stays empty until hover)
    const midY = y + h * 0.5;
    // Bottom center segment always visible; top center stays empty (wider gap)
    const topGapHalf = Math.max(20, w * 0.28);
    const bottomCenterHalf = Math.max(12, w * 0.14);

    const ready = box.w > 0 && box.h > 0 && w > r * 2 && h > r * 2;

    // Always on: top-left arm (gap at top center) → TL corner → down left halfway
    const topLeftPath = ready
        ? `M ${cx - topGapHalf} ${y} H ${x + r} A ${r} ${r} 0 0 0 ${x} ${y + r} V ${midY}`
        : "";
    // Always on: top-right arm (gap at top center) → TR corner → down right halfway
    const topRightPath = ready
        ? `M ${cx + topGapHalf} ${y} H ${right - r} A ${r} ${r} 0 0 1 ${right} ${y + r} V ${midY}`
        : "";
    // Always on: bottom center
    const bottomCenterPath = ready
        ? `M ${cx - bottomCenterHalf} ${bottom} H ${cx + bottomCenterHalf}`
        : "";

    // Hover: top center gap + lower sides + bottom corners → connect to bottom center
    const topCenterFill = ready
        ? `M ${cx - topGapHalf} ${y} H ${cx + topGapHalf}`
        : "";
    const leftFill = ready
        ? `M ${x} ${midY} V ${bottom - r} A ${r} ${r} 0 0 0 ${x + r} ${bottom} H ${cx - bottomCenterHalf}`
        : "";
    const rightFill = ready
        ? `M ${right} ${midY} V ${bottom - r} A ${r} ${r} 0 0 1 ${right - r} ${bottom} H ${cx + bottomCenterHalf}`
        : "";

    return (
        <svg
            ref={svgRef}
            className="about-draw-border"
            width={box.w || "100%"}
            height={box.h || "100%"}
            aria-hidden="true"
        >
            {topLeftPath && (
                <path className="about-draw-border-base" d={topLeftPath} />
            )}
            {topRightPath && (
                <path className="about-draw-border-base" d={topRightPath} />
            )}
            {bottomCenterPath && (
                <path className="about-draw-border-base" d={bottomCenterPath} />
            )}
            {topCenterFill && (
                <path className="about-draw-border-fill" pathLength="100" d={topCenterFill} />
            )}
            {leftFill && (
                <path className="about-draw-border-fill" pathLength="100" d={leftFill} />
            )}
            {rightFill && (
                <path className="about-draw-border-fill" pathLength="100" d={rightFill} />
            )}
        </svg>
    );
}

const technologies = [
    { label: "Next.js", icon: <SiNextdotjs />, year: 2021, award: true },
    { label: "TailwindCSS", icon: <SiTailwindcss />, year: 2022, award: true },
    { label: "Supabase", icon: <SiSupabase />, year: 2022, award: true },
    { label: "GitHub", icon: <SiGithub />, year: 2022, award: true },
    { label: "CSS3", icon: <SiCss3 />, year: 2021 },
    { label: "TypeScript", icon: <SiTypescript />, year: 2021 },
    { label: "Vercel", icon: <SiVercel />, year: 2021 },
    { label: "Node.js", icon: <SiNodedotjs />, year: 2021 },
    { label: "Firebase", icon: <SiFirebase />, year: 2021 },
    { label: "JavaScript", icon: <SiJavascript />, year: 2021 },
    { label: "HTML5", icon: <SiHtml5 />, year: 2021 },
    { label: "React", icon: <SiReact />, year: 2021 },
    { label: "Git", icon: <SiGit />, year: 2022 },
    { label: "Python", icon: <SiPython />, year: 2022 },
    { label: "Notion", icon: <SiNotion />, year: 2023 },
    { label: "BigQuery", icon: <SiGooglebigquery />, year: 2024 },
    { label: "Zustand", icon: <SiZustand />, year: 2024 },
    { label: "Fivetran", icon: <SiFivetran />, year: 2024 },
    { label: "Resend", icon: <SiResend />, year: 2024 },
    { label: "Unity", icon: <SiUnity />, year: 2024 },
] as const;

const highlights = [
    { label: "Full Stack", value: "Web development" },
    { label: "Focus", value: "UI + backend systems" },
    { label: "Approach", value: "Team & solo delivery" },
] as const;

const philosophyPrinciples = [
    {
        icon: FileCode2,
        title: "Readable by default",
        description:
            "Clear naming, small focused functions, and early returns keep logic easy to scan at a glance.",
    },
    {
        icon: Layers,
        title: "DRY & consistent",
        description:
            "Repeated patterns become reusable components, with Prettier and shared style guides keeping the codebase uniform.",
    },
    {
        icon: MessageSquareText,
        title: "Comments with purpose",
        description:
            "When complexity appears, comments explain why—not just what—so future changes stay safe and intentional.",
    },
    {
        icon: ShieldCheck,
        title: "Quality guardrails",
        description:
            "Feature-based organization, regular refactors, tests, and ESLint catch issues before they reach production.",
    },
] as const;

function About() {
    return (
        <div className="about-shell">
            <TextHeader text="About" />
            <p
                className="text-justify  md:text-center text-muted-foreground text-base sm:text-lg md:text-xl max-w-5xl mx-auto mb-12 sm:mb-10 px-4"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <TextAnimate animation="blurIn" duration={1} as="span">
                    A closer look at the person behind the projects—my approach to building,
                    the principles I follow, and the stack I use to bring products from idea to
                    production.
                </TextAnimate>
            </p>
            <div className="about-bento">
                <div
                    className="about-gallery-card"
                    data-aos="fade-up"
                    data-aos-delay="150"
                >
                    <div className="about-card-header">
                        <p className="about-card-eyebrow">Gallery</p>
                        <h2 className="about-card-title">Moments behind the work</h2>
                    </div>

                    <Carousel orientation="horizontal">
                        <div className="about-carousel-main">
                            <CarouselPrevious className="about-carousel-nav about-carousel-nav--prev" />
                            <CarouselNext className="about-carousel-nav about-carousel-nav--next" />

                            <CarouselMainContainer className="about-carousel-track">
                                {photoData.map((id) => (
                                    <SliderMainItem
                                        key={id.id}
                                        className="about-carousel-slide"
                                    >
                                        <Image
                                            src={id.photoURL.src}
                                            alt="About gallery photo"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="about-carousel-image"
                                        />
                                    </SliderMainItem>
                                ))}
                            </CarouselMainContainer>
                        </div>

                        <CarouselThumbsContainer className="about-carousel-thumbs">
                            {photoData.map((id, idx) => (
                                <SliderThumbItem
                                    key={id.id}
                                    index={idx}
                                    className="about-carousel-thumb basis-1/4"
                                >
                                    <Image
                                        src={id.photoURL.src}
                                        alt=""
                                        fill
                                        sizes="80px"
                                        className="about-carousel-thumb-image"
                                    />
                                </SliderThumbItem>
                            ))}
                        </CarouselThumbsContainer>
                    </Carousel>
                </div>

                <div
                    className="about-profile-card"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <TextHeader variant="sub" text="Who I Am" />

                    <p className="about-profile-copy">
                        <TextAnimate animation="blurIn" duration={1} as="span">
                            I&apos;m a creative problem-solver and passionate web developer who loves turning ideas into interactive, user-focused experiences. I believe great design meets great function, and I aim to build websites that not only look good—but feel right to use. Alongside crafting seamless interfaces, I also enjoy building reliable and scalable back-end systems that keep everything running smoothly behind the scenes.
                        </TextAnimate>
                    </p>

                    <div className="about-highlights">
                        {highlights.map((item, index) => (
                            <div
                                key={item.label}
                                className="about-highlight-wrap"
                                data-aos="fade-up"
                                data-aos-delay={250 + index * 75}
                            >
                                <div className="about-highlight">
                                    <AboutDrawBorder radius={6} />
                                    <span className="about-highlight-label">{item.label}</span>
                                    <span className="about-highlight-value">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="about-philosophy" data-aos="fade-up" data-aos-delay="100">
                <TextHeader variant="sub" text="My Code Philosophy" />

                <div className="about-philosophy-grid">
                    {philosophyPrinciples.map((principle, index) => (
                        <div
                            key={principle.title}
                            className="about-principle-wrap"
                            data-aos="fade-up"
                            data-aos-delay={150 + index * 75}
                        >
                            <article className="about-principle-card">
                                <AboutDrawBorder radius={8} />
                                <div className="about-principle-icon">
                                    <principle.icon className="size-5" aria-hidden="true" />
                                </div>
                                <h3 className="about-principle-title">{principle.title}</h3>
                                <p className="about-principle-copy">{principle.description}</p>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-skills" data-aos="fade-up" data-aos-delay="100">
                <div className="about-skills-header">
                    <TextHeader variant="sub" text="Technologies I Work With" />
                    <p className="about-skills-lead">
                        A toolkit built across frontend, backend, and product delivery—from interface polish to data and deployment.
                    </p>
                </div>

                <div className="tech-skills-grid about-skills-grid">
                    {technologies.map((tech, index) => (
                        <SkillTag
                            key={tech.label}
                            delay={(index % 10) + 1}
                            aosDelay={(index % 8) * 50}
                            icon={tech.icon}
                            year={tech.year}
                            award={"award" in tech ? tech.award : undefined}
                            className="about-skill-tag w-full justify-center"
                        >
                            {tech.label}
                        </SkillTag>
                    ))}
                </div>
            </section>


        </div>
    );
}

export default About;
