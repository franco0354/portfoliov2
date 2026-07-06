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
const dataText = [
    "FrontEnd Web Developer",
    "BackEnd Web Developer",
    "Full Stack Web Developer",
];
const longestRoleText = dataText.reduce((a, b) => (a.length > b.length ? a : b));

function Home() {

    return (
        <div className=" lg:pb-0 flex justify-center place-items-center w-full">
            <div className="container home">
                <div className="flex justify-between items-center gap-5   profile_and_text" >
                    <div className="text_profile md:basis-[63%]">
                        <h1 className="text-[clamp(2.90rem,5vw+1rem,6rem)] font-bold text-accent-foreground">
                            <span className="">Hello!</span> I&apos;m Franco
                        </h1>
                        <hr className="hidden md:block "/>
                        <h1 className="md:mt-3 text-[clamp(2rem,5vw+1rem,3rem)]">
                            <span className="gradient-text">
                            I am    
                            </span>{" "}
                            <span className="inline-grid [grid-template-areas:'stack'] *:[grid-area:stack] text-center md:text-left">
                                <span className="invisible select-none" aria-hidden="true">
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
                        <CardDescription className="text-xl p-2 md:p-0 text-center md:text-justify ">
                          Based in Bulacan, I am an Information Systems undergraduate from ICI with a deep passion for building and exploring digital solutions. Since 2021, I&apos;ve been focused on growing as a web developer, constantly learning and refining my skills. While I enjoy playing chess and Mobile Legends in my free time, my true drive comes from creating meaningful web experiences and continuously improving in the tech space.
                            <div className="mt-4 inline-talents flex gap-4">
                                <SkillTag delay={1}>Web App</SkillTag>
                                <SkillTag delay={2}>Responsive</SkillTag>
                                <SkillTag delay={3}>UI / UX</SkillTag>
                            </div>
                        </CardDescription>
                    </div>
                    <div className="img mt-15 lg:mt-0">
                        <SpringElement>
                            <Tilt rotationFactor={3} isRevese>
                                <Avatar className="size-60 sm:size-70 lg:size-90 AvatarImage">
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

