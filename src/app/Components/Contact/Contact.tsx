import React from 'react'
import { ContactLayouts } from './contact-layouts'
import { TextAnimate } from '@/components/magicui/text-animate'
import TextHeader from '@/components/text-header'
function Contact() {
    return (
        <div className='pb-12 md:pb-24'>
             <TextHeader
            text="Contact"
            />
            <p className="text-justify md:text-center text-muted-foreground text-base sm:text-lg md:text-xl max-w-5xl mx-auto mb-6 sm:mb-10 px-4">
                <TextAnimate animation="blurIn" duration={1} as="h1">
                    Feel free to reach out for collaborations, questions, or just to say hello.
                    I&apos;m always open to connecting and exploring new opportunities in design and development.
                </TextAnimate>
            </p>
            <div className="flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-5xl">
                    <ContactLayouts />
                </div>
            </div>
        </div>
    )
}

export default Contact