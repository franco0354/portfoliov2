import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/ui/extension/carousel";
import { photoData } from "./About-data";
import { TextAnimate } from "@/components/magicui/text-animate";
import Image from "next/image";
import TextHeader from "@/components/text-header";
import { SiCss3, SiTypescript, SiVercel, SiAntdesign, SiNodedotjs, SiYarn, SiGit, SiGithub, SiFirebase, SiNextdotjs, SiJavascript, SiHtml5, SiPython, SiReact, SiTailwindcss, SiNotion, SiSupabase, SiGooglebigquery, SiResend, SiUnity } from "react-icons/si";
import { SiFivetran, SiZustand } from "@/components/icons/brand-icons";
import "./About.modern.css";
import { SkillTag } from "@/components/ui/skill-tag";

const technologies = [
    { label: "Next.js", icon: <SiNextdotjs />, year: 2021, award: true },
    { label: "TailwindCSS", icon: <SiTailwindcss />, year: 2022, award: true },
    { label: "Supabase", icon: <SiSupabase />, year: 2022, award: true },
    { label: "GitHub", icon: <SiGithub />, year: 2022, award: true },
    { label: "CSS3", icon: <SiCss3 />, year: 2021 },
    { label: "TypeScript", icon: <SiTypescript />, year: 2021 },
    { label: "Vercel", icon: <SiVercel />, year: 2021 },
    { label: "Node.js", icon: <SiNodedotjs />, year: 2021 },
    { label: "Git", icon: <SiGit />, year: 2022 },
    { label: "Firebase", icon: <SiFirebase />, year: 2021 },
    { label: "JavaScript", icon: <SiJavascript />, year: 2021 },
    { label: "HTML5", icon: <SiHtml5 />, year: 2021 },
    { label: "Python", icon: <SiPython />, year: 2022 },
    { label: "React", icon: <SiReact />, year: 2021 },
    { label: "Notion", icon: <SiNotion />, year: 2023 },
    { label: "BigQuery", icon: <SiGooglebigquery />, year: 2024 },
    { label: "Zustand", icon: <SiZustand />, year: 2024 },
    { label: "Fivetran", icon: <SiFivetran />, year: 2024 },
    { label: "Resend", icon: <SiResend />, year: 2024 },
    { label: "Unity", icon: <SiUnity />, year: 2024 },
] as const;

const CarouselExample = () => {
    return (
        <div className="pt-8 md:pt-24 text-justify md:text-center text-base sm:text-lg md:text-xl">
            <TextHeader
                text="About"
            />
            <blockquote
                className="mb-6 w-fit max-w-4xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl border-l-2 border-muted-foreground/40 pl-4 pr-2 italic text-justify md:text-left"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <TextAnimate animation="blurIn" as="h1" duration={1}>
                    &quot;Great developers aren&#39;t born—they&#39;re shaped through consistency, curiosity, and clean code.&quot;
                </TextAnimate>
            </blockquote>

            <div
                className="flex flex-col md:flex-row justify-center place-items-center w-full max-w-4xl mx-auto px-2 gap-4 min-w-0"
                data-aos="zoom-in"
                data-aos-delay="200"
            >
                <Carousel orientation="horizontal">
                    <div className="relative min-w-0 flex-1 md:basis-3/4 w-full">
                        <CarouselMainContainer className="h-48 sm:h-56 md:h-72">
                            {photoData.map((id) => (
                                <SliderMainItem
                                    key={id.id}
                                    className="border border-muted flex overflow-hidden items-center justify-center h-48 sm:h-56 md:h-72 rounded-md"
                                >
                                    <Image src={id.photoURL.src} alt="" width={id.photoURL.width} height={id.photoURL.height} className="object-contain" />
                                </SliderMainItem>
                            ))}
                        </CarouselMainContainer>
                    </div>
                    <CarouselThumbsContainer className="h-24 sm:h-32 md:h-40 min-w-0 flex-1 md:basis-1/4 w-full mt-4 md:mt-0">
                        {photoData.map((id, idx) => (
                            <SliderThumbItem
                                key={id.id}
                                index={idx}
                                className="rounded-md bg-transparent cursor-pointer "
                            >
                                <Image src={id.photoURL.src} alt="" width={id.photoURL.width} height={id.photoURL.height} className="object-cover aspect-video " />
                            </SliderThumbItem>
                        ))}
                    </CarouselThumbsContainer>
                </Carousel>

            </div>

            {/* About Me Section */}
            <div className="flex justify-center mt-12" data-aos="fade-up" data-aos-delay="100">
                <div className="max-w-7xl">
                    <div className="mb-6">
                        <TextHeader
                            variant="sub"
                            text="Who I Am"
                        />
                    </div>
                    <p
                        className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-2 text-justify lg:text-center md:text-left"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <TextAnimate animation="blurIn" duration={1} as="h1">
                            I&apos;m Franco, a creative problem-solver and passionate web developer based in Bulacan,
                            Philippines. I love turning ideas into interactive, user-focused digital experiences. I believe
                            the best products strike a balance between great design and solid engineering—and I aim to
                            build websites and apps that not only look good, but feel intuitive to use. Beyond crafting
                            seamless frontends, I also enjoy designing reliable, scalable backend systems that keep
                            everything running smoothly behind the scenes. Whether I&apos;m collaborating with a team or
                            learning something new on my own, I bring the same attention to detail and drive to deliver
                            work I&apos;m proud of.
                        </TextAnimate>
                    </p>
                </div>
            </div>

            {/* Clean Code Philosophy Section */}
            <div className="flex justify-center mt-12" data-aos="fade-up" data-aos-delay="100">
                <div className="max-w-7xl">
                    <div className="mb-6">
                        <TextHeader
                            variant="sub"
                            text="My Code Philosophy"
                        />
                    </div>
                    <div className=" dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl ">
                        <p
                            className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed px-2 text-justify lg:text-center md:text-left"
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            <TextAnimate animation="blurIn" duration={1.2} as="h1">
                                I believe clean code is a craft, not an accident. I name variables and functions clearly
                                so their purpose is obvious at a glance. I keep functions small and focused—each one
                                should do one thing well. Rather than deeply nested conditions, I prefer early returns
                                to keep logic easy to follow.
                                I follow the DRY principle: when something repeats, I extract it into a reusable function
                                or component. Consistent formatting with tools like Prettier and a shared style guide
                                keeps the codebase uniform across the team.
                                When logic gets complex, I add comments that explain why—not just what. I organize files
                                by feature, refactor regularly, and write tests to catch bugs early. Linters like ESLint
                                help me spot issues before they reach production.
                            </TextAnimate>
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="flex justify-center mt-12 w-full" data-aos="fade-up" data-aos-delay="100">
                <div className="w-full max-w-7xl px-2">
                    <div className="mb-6">
                        <TextHeader
                            variant="sub"
                            text="Technologies I Work With"
                        />
                    </div>
                    <div className="tech-skills-grid grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
                </div>
            </div>
        </div>
    );
};

export default CarouselExample;