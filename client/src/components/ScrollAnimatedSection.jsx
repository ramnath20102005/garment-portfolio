// ScrollAnimatedSection.jsx - Reusable component for scroll animations
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ScrollAnimatedSection({
    children,
    animation = 'animate-fade-in-up',
    delay = 0,
    className = '',
    once = true
}) {
    const [ref, isVisible] = useScrollAnimation({ once, threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`${animation} ${isVisible ? 'visible' : ''} ${delay ? `animate-delay-${delay}` : ''} ${className}`}
        >
            {children}
        </div>
    );
}

export default ScrollAnimatedSection;
