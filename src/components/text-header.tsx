import React from 'react'

function TextHeader(props: { text: string, variant?: 'main' | 'sub', delay?: number }) {
    const isSubHeader = props.variant === 'sub';

    return (
        <div className="relative" data-aos="fade-up" data-aos-delay={props.delay ?? 0}>
            <div className={`flex items-center justify-center mb-8 sm:mb-12 ${isSubHeader ? 'mb-6 sm:mb-8' : ''}`}>
                {/* Simple decorative line */}
                <div className={`hidden sm:block w-8 sm:w-16 h-px bg-current opacity-80 ${isSubHeader ? 'sm:w-12' : ''}`}></div>

                {/* Main text container */}
                <div className={`mx-3 sm:mx-6 text-justify md:text-center ${isSubHeader ? 'mx-2 sm:mx-4' : ''}`}>
                    <h1 className={`font-light text-gray-900 tracking-wide ${isSubHeader
                            ? 'text-2xl sm:text-3xl md:text-4xl'
                            : 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl'
                        }`}>
                        {props.text}
                    </h1>
                </div>

                {/* Simple decorative line */}
                <div className={`hidden sm:block w-8 sm:w-16 h-px bg-current opacity-80 ${isSubHeader ? 'sm:w-12' : ''}`}></div>
            </div>
        </div>
    )
}

export default TextHeader