import { useEffect, useState } from 'react';
import { LOAD_DURATION } from '@/components/loading';

export const usePageState = () => {
    const [activeSection, setActiveSection] = useState('Home');
    const [isOverInput, setIsOverInput] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Handle mouse over input elements
    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.contentEditable === 'true') {
                setIsOverInput(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.contentEditable === 'true') {
                setIsOverInput(false);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    // Initialize loading state
    useEffect(() => {
        setIsLoaded(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.getElementById('initial-loader')?.remove();
            document.body.style.overflow = '';
        }, LOAD_DURATION);

        return () => clearTimeout(timer);
    }, []);

    // Scroll-based active section detection
    useEffect(() => {
        const getHeaderHeight = () =>
            window.matchMedia('(min-width: 640px)').matches ? 64 : 56;

        const handleScroll = () => {
            const sections = ['Home', 'About', 'Project', 'Timeline', 'Contact'];
            const scrollPosition = window.scrollY + getHeaderHeight() + 80;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY;
                    const sectionBottom = sectionTop + rect.height;

                    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        const timer = setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoaded]);

    return {
        activeSection,
        isOverInput,
        isLoaded,
        isLoading,
    };
};
