import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogTitle,
    MorphingDialogImage,
    MorphingDialogClose,
    MorphingDialogDescription,
    MorphingDialogContainer,
} from '../../../../components/motion-primitives/morphing-dialog';
import { ArrowUpRight, GithubIcon, ImageUpscale, X } from 'lucide-react';
import { ProjectLayoutsProps } from './project-data';
import { Tilt } from '../../../../components/motion-primitives/tilt';
import React from 'react'
import { Cursor } from '../../../../components/motion-primitives/cursor';
import { MouseIcon } from '../../page-data';
import './Project.modern.css';
function Projectlayouts(props: ProjectLayoutsProps) {
    return (
        <MorphingDialog
            transition={{
                type: 'spring',
                bounce: 0.05,
                duration: 0.25,
            }}
        >
            <MorphingDialogTrigger
                style={{
                    borderRadius: '4px',
                }}
                className='block w-full max-w-full overflow-hidden rounded sm:max-w-[470px] border-0 bg-transparent p-0 text-left'
            >
                <Tilt
                    rotationFactor={8}
                    isRevese
                    className='flex w-full flex-col overflow-hidden rounded border border-border/50 bg-card transition-colors duration-200 hover:border-border'
                >
                    <MorphingDialogImage
                        src={props.photoURl}
                        alt={props.photoAlt}
                        className='w-full object-cover aspect-video'
                    />
                    <div className='flex grow flex-row items-center justify-between gap-3 border-t border-border/50 px-4 py-3'>
                        <div>
                            <MorphingDialogTitle className='text-sm font-medium tracking-tight text-foreground'>
                                {props.title}
                            </MorphingDialogTitle>

                        </div>
                        <div className='flex shrink-0 gap-1'>
                            <button className='cursor-pointer rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground' aria-label="View project details">
                                <ImageUpscale size={16} />
                            </button>
                            <a href={props.github} className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground' aria-label="View project on GitHub">
                                <GithubIcon size={16} />
                            </a>
                        </div>
                    </div>
                </Tilt>
            </MorphingDialogTrigger>

            <MorphingDialogContainer>
                <Cursor
                    attachToParent
                    variants={{
                        initial: { scale: 0.3, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        exit: { scale: 0.3, opacity: 0 },
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.15,
                    }}
                    className='z-50 hidden lg:block'
                >
                    <div>
                        <MouseIcon className='h-6 w-6' />
                    </div>
                </Cursor>
                <MorphingDialogContent className='project-popup pointer-events-auto'>
                    <div className='project-popup-glow project-popup-glow--top' aria-hidden='true' />
                    <div className='project-popup-glow project-popup-glow--bottom' aria-hidden='true' />

                    <div className='project-popup-hero'>
                        <MorphingDialogImage
                            src={props.photoURl}
                            alt={props.photoAlt}
                            className='project-popup-image'
                        />
                        <div className='project-popup-image-overlay' aria-hidden='true' />
                        <MorphingDialogClose className='project-popup-close'>
                            <X size={18} strokeWidth={2.25} />
                        </MorphingDialogClose>
                    </div>

                    <div className='project-popup-body'>
                        <span className='project-popup-badge'>
                            <span className='project-popup-badge-dot' aria-hidden='true' />
                            Featured Project
                        </span>

                        <MorphingDialogTitle className='project-popup-title'>
                            {props.title}
                        </MorphingDialogTitle>

                        <MorphingDialogDescription
                            disableLayoutAnimation
                            variants={{
                                initial: { opacity: 0, y: 20 },
                                animate: { opacity: 1, y: 0 },
                                exit: { opacity: 0, y: 20 },
                            }}
                        >
                            <p className='project-popup-desc'>
                                {props.description}
                            </p>

                            {Array.isArray(props.icon) && props.icon.length > 0 && (
                                <div className='project-popup-section'>
                                    <p className='project-popup-section-label'>Built with</p>
                                    <div className='project-popup-tech-list'>
                                        {props.icon.map((icon: string, idx: number) => (
                                            <span key={idx} className='project-popup-tech'>
                                                {icon}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className='project-popup-actions'>
                                {props.link && props.link !== '#' && (
                                    <a
                                        href={props.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='project-popup-btn project-popup-btn--primary'
                                    >
                                        Live Demo
                                        <ArrowUpRight size={15} />
                                    </a>
                                )}
                                {props.github && props.github !== '#' && (
                                    <a
                                        href={props.github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='project-popup-btn project-popup-btn--secondary'
                                    >
                                        <GithubIcon size={16} />
                                        Source Code
                                    </a>
                                )}
                            </div>
                        </MorphingDialogDescription>
                    </div>
                </MorphingDialogContent>
            </MorphingDialogContainer>

        </MorphingDialog>
    )
}

export default Projectlayouts