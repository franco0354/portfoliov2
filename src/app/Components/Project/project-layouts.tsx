import { ArrowUpRight, GithubIcon } from 'lucide-react';
import { ProjectLayoutsProps } from './project-data';
import React from 'react'
import './Project.modern.css';

function Projectlayouts(props: ProjectLayoutsProps) {
    const hasLink = props.link && props.link !== '#'
    const hasGithub = props.github && props.github !== '#'
    const reversed = (props.index ?? 0) % 2 === 1
    const number = String((props.index ?? 0) + 1).padStart(2, '0')

    return (
        <article className={`project-frame flex w-full flex-col rounded border border-border/50 bg-card ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <span className='project-frame-corner project-frame-corner--tr' aria-hidden='true' />
            <span className='project-frame-corner project-frame-corner--bl' aria-hidden='true' />
            <span className='project-frame-corner project-frame-corner--tl' aria-hidden='true' />
            <span className='project-frame-corner project-frame-corner--br' aria-hidden='true' />
            <div className={`project-frame-media w-full overflow-hidden md:w-2/5 md:shrink-0 ${reversed ? 'md:rounded-r rounded-t md:rounded-tl-none' : 'md:rounded-l rounded-t md:rounded-tr-none'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={props.photoURl}
                    alt={props.photoAlt}
                    className='h-full w-full object-cover aspect-video md:aspect-auto'
                />
            </div>
            <div className={`flex grow flex-col gap-4 border-t border-border/50 p-5 md:p-6 md:border-t-0 ${reversed ? 'md:border-r' : 'md:border-l'}`}>
                <div className='flex items-baseline justify-between gap-3'>
                    <h3 className='text-lg font-semibold tracking-tight text-foreground'>
                        {props.title}
                    </h3>
                    <span className='font-mono text-xs tabular-nums text-muted-foreground'>
                        {number}
                    </span>
                </div>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                    {props.description}
                </p>

                {Array.isArray(props.icon) && props.icon.length > 0 && (
                    <div className='flex flex-wrap gap-1.5'>
                        {props.icon.map((icon: string, idx: number) => (
                            <span
                                key={idx}
                                className='rounded-sm border border-border/50 bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground'
                            >
                                {icon}
                            </span>
                        ))}
                    </div>
                )}

                {(hasLink || hasGithub) && (
                    <div className='mt-auto flex flex-wrap gap-2 border-t border-border/50 pt-4'>
                        {hasLink && (
                            <a
                                href={props.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-1 rounded border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-opacity hover:opacity-90'
                            >
                                Live Demo
                                <ArrowUpRight size={14} />
                            </a>
                        )}
                        {hasGithub && (
                            <a
                                href={props.github}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-1.5 rounded border border-border/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                            >
                                <GithubIcon size={14} />
                                Source Code
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}

export default Projectlayouts
