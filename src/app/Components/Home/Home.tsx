import { CardDescription } from "@/components/ui/card";
import Profile from "@/app/assets/img/transparent-profile1.png";
import '../Home/Home.style.css'
import '../Home/Home.modern.css'
import { Tilt } from "../../../../components/motion-primitives/tilt";
import { SpringElement } from '@/components/animate-ui/components/spring-element';
import { TypingText } from '@/components/animate-ui/text/typing';
import {
    Avatar,
    AvatarImage,
} from '@/components/ui/avatar';
import { SkillTag } from '@/components/ui/skill-tag';
import {
    SiReact,
    SiNextdotjs,
    SiFirebase,
    SiSupabase,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiTailwindcss,
    SiGit,
    SiGithub,
} from 'react-icons/si';

function Skill({ children }: { children: React.ReactNode }) {
    return <span className="text-primary font-semibold">{children}</span>;
}

const coreSkillTags = [
    { label: 'React', icon: <SiReact /> },
    { label: 'Next.js', icon: <SiNextdotjs /> },
    { label: 'React Native', icon: <SiReact /> },
    { label: 'TypeScript', icon: <SiTypescript /> },
    { label: 'JavaScript', icon: <SiJavascript /> },
    { label: 'Node.js', icon: <SiNodedotjs /> },
    { label: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { label: 'Firebase', icon: <SiFirebase /> },
    { label: 'Supabase', icon: <SiSupabase /> },
    { label: 'Git', icon: <SiGit /> },
    { label: 'GitHub', icon: <SiGithub /> },
] as const;

const dataText = [
    "FrontEnd Web Developer",
    "BackEnd Web Developer",
    "Full Stack Web Developer",
];
const longestRoleText = dataText.reduce((a, b) => (a.length > b.length ? a : b));

function Home() {

    return (
        <div className=" lg:pb-0 lg:-mt-24 flex justify-center place-items-center w-full">
            <div className="container home">
                <div className="flex justify-between items-center gap-5   profile_and_text" >
                    <div className="text_profile md:basis-[63%]">
                        <div className="text-center md:text-left">
                        <h1 className="text-[clamp(1.75rem,6vw+0.5rem,6rem)] font-bold text-accent-foreground">
                            <span className="">Hello!</span> I&apos;m Franco
                        </h1>
                        <hr className="hidden md:block " />
                        <h1 className="md:mt-3 text-[clamp(1.25rem,4vw+0.5rem,3rem)]">
                            <span className="gradient-text">
                                I am
                            </span>{" "}
                            <span className="block text-center md:inline-grid md:[grid-template-areas:'stack'] md:*:[grid-area:stack] md:text-left">
                                <span className="hidden md:inline invisible select-none" aria-hidden="true">
                                    {longestRoleText}
                                </span>
                                <TypingText
                                    text={dataText}
                                    cursor
                                    loop={true}
                                    cursorClassName="h-[1em] md:h-10"
                                />
                            </span>
                        </h1>
                        </div>
                        <CardDescription className="text-base sm:text-lg md:text-xl p-2 md:p-0 text-justify md:text-left">
                            Based in Bulacan, Philippines, specializing in{" "}
                            <span className="text-primary font-semibold">modern web and mobile development</span>.
                            I enjoy building fast, scalable, and user-focused applications using technologies like{" "}
                            <span className="text-primary font-semibold">React</span>,{" "}
                            <span className="text-primary font-semibold">Next.js</span>,{" "}
                            <span className="text-primary font-semibold">React Native</span>,{" "}
                            <span className="text-primary font-semibold">Firebase</span>,{" "}
                            <span className="text-primary font-semibold">Supabase</span>, and{" "}
                            <span className="text-primary font-semibold">TypeScript</span>.
                            I believe great software comes from continuous learning, thoughtful problem-solving,
                            and attention to both{" "}
                            <span className="text-primary font-semibold">user experience</span> and{" "}
                            <span className="text-primary font-semibold">code quality</span>.
                            <div className="mt-4 inline-talents flex flex-wrap gap-3">
                                <SkillTag delay={1} icon={<SiReact />}>React</SkillTag>
                                <SkillTag delay={2} icon={<SiNextdotjs />}>Next.js</SkillTag>
                                <SkillTag delay={3} icon={<SiReact />}>React Native</SkillTag>
                                <SkillTag delay={4} icon={<SiFirebase />}>Firebase</SkillTag>
                                <SkillTag delay={4} icon={<SiSupabase />}>Supabase</SkillTag>
                                <SkillTag delay={4} icon={<SiTypescript />}>TypeScript</SkillTag>
                            </div>
                        </CardDescription>
                    </div>
                    <div className="img mt-15 lg:mt-0">
                        <SpringElement>
                            <Tilt rotationFactor={3} isRevese>
                                <Avatar className="size-44 sm:size-56 md:size-64 lg:size-80 AvatarImage">
                                    <AvatarImage
                                        draggable={false}
                                        src={Profile.src}
                                        className="object-cover"
                                        alt="Franco's Profile Picture"
                                    />
                                </Avatar>
                            </Tilt>
                        </SpringElement>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

