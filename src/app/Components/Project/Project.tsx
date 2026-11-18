import React from 'react'
import { ProjectData } from './project-data'
import Projectlayouts from './project-layouts'
import { TextAnimate } from '@/components/magicui/text-animate'
import TextHeader from '@/components/text-header'
function Project() {
    return (
        <div className='pt-8 pb-12'>
            <TextHeader
                text="Project"
            />
            <p
                className="text-center text-muted-foreground text-base sm:text-lg md:text-xl max-w-5xl mx-auto mb-6 sm:mb-10 px-4 text-balance"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <TextAnimate animation="blurIn" duration={1} as="span" className="text-center">
                    Explore a curated selection of projects that reflect my skills in design, development, and
                    problem-solving. From full-stack web apps to mobile tools, each build showcases my commitment to
                    creating functional, performant, and visually polished digital experiences.
                </TextAnimate>
            </p>
            <div>
                <div className='mx-auto flex max-w-5xl flex-col gap-6 px-4'>
                    {ProjectData.map((id, index) => (
                        <div
                            key={id.id}
                            data-aos="fade-up"
                        >
                            <Projectlayouts
                                photoAlt={id.description}
                                photoURl={id.projectURL.src}
                                title={id.title}
                                description={id.description}
                                link={id.link}
                                icon={id.icon}
                                github={id.github}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Project

