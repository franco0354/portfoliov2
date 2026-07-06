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
import { SiCss3, SiTypescript, SiVercel, SiAntdesign, SiBootstrap, SiNodedotjs, SiYarn, SiGit, SiGithub, SiUnity, SiFirebase, SiNextdotjs, SiJavascript, SiHtml5, SiSass, SiPython, SiReact, SiTailwindcss, SiNotion, SiSupabase } from "react-icons/si";
import "./About.modern.css";
import { SkillTag } from "@/components/ui/skill-tag";

const technologies = [
    { label: "CSS3", icon: <SiCss3 /> },
    { label: "TypeScript", icon: <SiTypescript /> },
    { label: "Vercel", icon: <SiVercel /> },
    { label: "Ant Design", icon: <SiAntdesign /> },
    { label: "Bootstrap", icon: <SiBootstrap /> },
    { label: "Node.js", icon: <SiNodedotjs /> },
    { label: "Yarn", icon: <SiYarn /> },
    { label: "Git", icon: <SiGit /> },
    { label: "GitHub", icon: <SiGithub /> },
    { label: "Unity", icon: <SiUnity /> },
    { label: "Firebase", icon: <SiFirebase /> },
    { label: "Next.js", icon: <SiNextdotjs /> },
    { label: "JavaScript", icon: <SiJavascript /> },
    { label: "HTML5", icon: <SiHtml5 /> },
    { label: "SASS", icon: <SiSass /> },
    { label: "Python", icon: <SiPython /> },
    { label: "React", icon: <SiReact /> },
    { label: "TailwindCSS", icon: <SiTailwindcss /> },
    { label: "Notion", icon: <SiNotion /> },
    { label: "Supabase", icon: <SiSupabase /> },
] as const;

const CarouselExample = () => {
    return (
        <div className="pt-8 md:pt-24 text-justify md:text-center text-base sm:text-lg md:text-xl">
            <TextHeader
                text="About"
            />
            <blockquote className="mb-6 w-fit max-w-4xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl border-l-2 border-muted-foreground/40 pl-4 pr-2 italic text-justify md:text-left">
                <TextAnimate animation="blurIn" as="h1" duration={1}>
                    &quot;Great developers aren&#39;t born—they&#39;re made through consistency, curiosity, and code.&quot;
                </TextAnimate>
            </blockquote>

            <div className="flex flex-col md:flex-row justify-center place-items-center w-full max-w-4xl mx-auto px-2 gap-4 min-w-0">
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
            <div className="flex justify-center mt-12">
                <div className="max-w-7xl">
                    <div className="mb-6">
                        <TextHeader
                            variant="sub"
                            text="Who I Am"
                        />
                    </div>
                    <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-2 text-justify lg:text-center md:text-left">
                        <TextAnimate animation="blurIn" duration={1} as="h1">
                            I&apos;m a creative problem-solver and passionate web developer who loves turning ideas into
                            interactive, user-focused experiences. I believe great design meets great function, and I aim
                            to build websites that not only look good—but feel right to use. Alongside crafting seamless
                            interfaces, I also enjoy building reliable and scalable back-end systems that keep everything
                            running smoothly behind the scenes.
                        </TextAnimate>
                    </p>
                </div>
            </div>

            {/* Clean Code Philosophy Section */}
            <div className="flex justify-center mt-12">
                <div className="max-w-7xl">
                    <div className="mb-6">
                        <TextHeader
                            variant="sub"
                            text="My Code Philosophy"
                        />
                    </div>
                    <div className=" dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl ">
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed px-2 text-justify lg:text-center md:text-left">
                            <TextAnimate animation="blurIn" duration={1.2} as="h1">
                                To keep my code clean, I try to name variables and functions in a way that clearly shows what they&apos;re for.
                                I keep functions short and focused on doing just one thing so they&apos;re easier to read and reuse.
                                Instead of nesting conditions too much, I use early returns to keep the flow simple.
                                I follow the DRY principle so I don&apos;t repeat code—if something&apos;s reusable, I turn it into a function or component.
                                I also stick to consistent formatting using tools like Prettier and follow a style guide so everything looks uniform.
                                When logic gets tricky, I leave comments to explain why I did something, not just what it does.
                                I organize my files by feature or functionality and refactor often to make things cleaner.
                                I also write tests to catch bugs early and keep things well-structured.
                                Lastly, I use linters like ESLint to spot and fix issues automatically.
                            </TextAnimate>
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="flex justify-center mt-12 w-full">
                <div className="w-full max-w-7xl px-2">
                    <div className="mb-6">
                        <TextHeader
                            variant="sub"
                            text="Technologies I Work With"
                        />
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {technologies.map((tech, index) => (
                            <SkillTag
                                key={tech.label}
                                delay={(index % 10) + 1}
                                icon={tech.icon}
                                className="w-full justify-center"
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