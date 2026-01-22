import { useState, useEffect } from 'react';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollContainer = document.querySelector('main');
            if (!scrollContainer) return;

            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            setProgress(Math.min(100, Math.max(0, progressPercent)));
        };

        const scrollContainer = document.querySelector('main');
        scrollContainer?.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => scrollContainer?.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-16 left-0 right-0 h-1 bg-background-void/50 z-40">
            <div
                className="h-full bg-gradient-to-r from-brand-neon-blue via-brand-neon-pink to-brand-electric-purple transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
            {/* Glow effect */}
            <div
                className="absolute top-0 h-full bg-gradient-to-r from-brand-neon-blue via-brand-neon-pink to-brand-electric-purple blur-sm opacity-50"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
