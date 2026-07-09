import React from 'react';
import { cn } from '@/lib/utils';

interface SkillTagProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  icon?: React.ReactNode;
}

export function SkillTag({
  children,
  delay = 1,
  className,
  icon
}: SkillTagProps) {
  const delayClass = `animate-delay-${delay}`;

  return (
    <span
      className={cn(
        "modern-card text-sm px-4 py-2.5 rounded-lg font-medium inline-flex items-center animate-fade-scale hover:scale-105 transition-transform",
        delayClass,
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </span>
  );
}
