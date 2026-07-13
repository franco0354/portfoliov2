import React from 'react'
import { ContactLayouts } from './contact-layouts'
import { TextAnimate } from '@/components/magicui/text-animate'
import TextHeader from '@/components/text-header'
function Contact() {
    return (
        <div className='pt-8 pb-12'>
            <TextHeader
                text="Contact"
            />
            <p
                className="text-justify md:text-center text-muted-foreground text-base sm:text-lg md:text-xl max-w-5xl mx-auto mb-6 sm:mb-10 px-4"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <TextAnimate animation="blurIn" duration={1} as="h1">
                    Have a project in mind, a collaboration opportunity, or just want to say hello?
                    I&apos;d love to hear from you. I&apos;m always open to connecting and exploring new
                    opportunities in web development, mobile apps, and thoughtful product design.
                </TextAnimate>
            </p>
            <div
                className="flex flex-col items-center justify-center px-4"
                data-aos="fade-up"
                data-aos-delay="200"
            >
                <div className="w-full max-w-5xl">
                    <ContactLayouts />
                </div>
            </div>
        </div>
    )
}

export default Contact