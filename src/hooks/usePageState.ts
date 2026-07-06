import { useEffect, useState } from 'react';
import { LOAD_DURATION } from '@/components/loading';

export const usePageState = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
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

    // Initialize theme and loading state
    useEffect(() => {
        const storedMode = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialMode = storedMode || (prefersDark ? 'dark' : 'light');
        setMode(initialMode);
        setIsLoaded(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.getElementById('initial-loader')?.remove();
        }, LOAD_DURATION);

        return () => clearTimeout(timer);
    }, []);

    // Apply theme to document
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem('theme', mode);

        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [mode, isLoaded]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            const storedTheme = localStorage.getItem('theme');
            if (!storedTheme) {
                setMode(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
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

        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoaded]);

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return {
        mode,
        activeSection,
        isOverInput,
        isLoaded,
        isLoading,
        toggleMode
    };
}; 