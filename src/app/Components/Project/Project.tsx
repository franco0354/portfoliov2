import React from 'react'
import { ProjectData } from './project-data'
import Projectlayouts from './project-layouts'
import { TextAnimate } from '@/components/magicui/text-animate'
import TextHeader from '@/components/text-header'
function Project() {
    return (
        <div className='pt-8 pb-12 md:pt-24 md:pb-24'>
            <TextHeader
                text="Project"
            />
            <p className="text-justify md:text-center text-muted-foreground text-base sm:text-lg md:text-xl max-w-5xl mx-auto mb-6 sm:mb-10 px-4">
                <TextAnimate animation="blurIn" duration={1} as="h1">
                    Explore a collection of my featured projects showcasing skills in design, development, and
                    problem-solving.
                    Each project reflects my passion for creating
                    functional and
                    visually appealing digital experiences.
                </TextAnimate>
            </p>
            <div>
                <div className='flex justify-center p-2 gap-4 sm:gap-6 md:gap-10 flex-wrap'>
                    {ProjectData.map((id) => (
                        <Projectlayouts
                            key={id.id}
                            photoAlt={id.description}
                            photoURl={id.projectURL.src}
                            title={id.title}
                            description={id.description}
                            link={id.link}
                            icon={id.icon}
                            github={id.github}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Project

