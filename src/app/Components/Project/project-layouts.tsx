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
import { ArrowUpRight, GithubIcon, ImageUpscale } from 'lucide-react';
import { ProjectLayoutsProps } from './project-data';
import { Tilt } from '../../../../components/motion-primitives/tilt';
import React from 'react'
import { Cursor } from '../../../../components/motion-primitives/cursor';
import { MouseIcon } from '../../page-data';
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
                            <MorphingDialogTitle className='text-sm font-medium tracking-tight text-zinc-950 dark:text-zinc-50'>
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
                    <MorphingDialogContent
                        style={{
                            borderRadius: '4px',
                        }}
                        className='pointer-events-auto relative mx-4 flex h-auto max-h-[90vh] w-[calc(100%-2rem)] flex-col border border-border/50 bg-card sm:mx-0 sm:w-[500px]'
                    >
                        <Tilt rotationFactor={8} isRevese className='flex flex-col overflow-hidden bg-card'>
                            <MorphingDialogImage
                                src={props.photoURl}
                                alt={props.photoAlt}
                                className='h-full w-full'
                            />
                            <div className='overflow-y-auto p-6'>
                                <MorphingDialogTitle className='text-2xl text-zinc-950 dark:text-zinc-50'>
                                    <a className='hover:text-gray-500/50 gap-1  flex' href={props.link}>
                                        {props.title}
                                        <ArrowUpRight size={13} className='mt-2 text-gray-500/80 ' />
                                    </a>
                                </MorphingDialogTitle>

                                <MorphingDialogDescription
                                    disableLayoutAnimation
                                    variants={{
                                        initial: { opacity: 0, scale: 0.8, y: 100 },
                                        animate: { opacity: 1, scale: 1, y: 0 },
                                        exit: { opacity: 0, scale: 0.8, y: 100 },
                                    }}
                                >
                                    <p className='mt-2 mb-5 text-zinc-500 dark:text-zinc-500 text-justify md:text-left'>
                                        {props.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(props.icon) && props.icon.map((icon: string, idx: number) => {
                                            const badgeColors = [
                                                'bg-indigo-200 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-200',
                                                'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200',
                                                'bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-200',
                                                'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
                                                'bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-200',
                                                'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
                                                'bg-cyan-200 text-cyan-800 dark:bg-cyan-700 dark:text-cyan-200',
                                                'bg-yellow-300 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-200',
                                            ];
                                            const colorClass = badgeColors[idx % badgeColors.length];
                                            return (
                                                <span
                                                    key={idx}
                                                    className={`${colorClass} text-sm px-3 py-1 rounded-full`}
                                                >
                                                    {icon}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </MorphingDialogDescription>

                            </div>
                        </Tilt>
                        <MorphingDialogClose className='text-zinc-50 bg-gray-500/40 rounded-full p-2 cursor-pointer' />
                    </MorphingDialogContent>
            </MorphingDialogContainer>

        </MorphingDialog>
    )
}

export default Projectlayouts