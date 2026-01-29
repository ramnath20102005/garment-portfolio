// useScrollAnimation.js - Custom hook for scroll-based animations
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optionally unobserve after first intersection
                    if (options.once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!options.once) {
                    setIsVisible(false);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px'
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options.once, options.threshold, options.rootMargin]);

    return [elementRef, isVisible];
};

// Predefined animation classes
export const animations = {
    fadeIn: 'animate-fade-in',
    fadeInUp: 'animate-fade-in-up',
    fadeInDown: 'animate-fade-in-down',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right',
    scaleIn: 'animate-scale-in',
    slideInUp: 'animate-slide-in-up',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right'
};
