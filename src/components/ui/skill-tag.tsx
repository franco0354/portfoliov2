import React from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillTagProps {
  children: React.ReactNode;
  delay?: number;
  aosDelay?: number;
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  year?: number;
  award?: boolean;
}

export function SkillTag({
  children,
  delay = 1,
  aosDelay,
  className,
  icon,
  iconClassName,
  year,
  award,
}: SkillTagProps) {
  const delayClass = `animate-delay-${delay}`;

  if (year) {
    return (
      <span
        className={cn(
          "modern-card relative flex min-h-17 w-full flex-col items-center justify-center px-3 pb-2.5 pt-6 text-sm font-medium animate-fade-scale",
          delayClass,
          className
        )}
        data-aos="zoom-in"
        data-aos-delay={aosDelay}
      >
        <span className="absolute top-2 left-2.5 whitespace-nowrap rounded-full bg-foreground/8 px-2 py-0.5 text-[0.6rem] font-normal tracking-wide opacity-70">
          {year}
        </span>
        {award && (
          <span className="absolute top-2 right-2.5 inline-flex items-center rounded-full bg-primary/15 p-1 text-primary">
            <Award size={10} />
          </span>
        )}
        <span className="inline-flex items-center gap-2">
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "modern-card inline-flex cursor-default items-center rounded-lg px-4 py-2.5 text-sm font-medium animate-fade-scale",
        delayClass,
        className
      )}
      data-aos="zoom-in"
      data-aos-delay={aosDelay}
    >
      {icon && (
        <span className={cn("mr-2 shrink-0", iconClassName)}>{icon}</span>
      )}
      {children}
    </span>
  );
}
