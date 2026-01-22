import { useState, useEffect } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Parse headings from markdown content
    useEffect(() => {
        const headingRegex = /^(#{2,4})\s+(.+)$/gm;
        const items: TocItem[] = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2].replace(/[*_`]/g, ''); // Remove markdown formatting
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-');

            items.push({ id, text, level });
        }

        setHeadings(items);
    }, [content]);

    // Track active heading based on scroll position
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                <div className="text-xs font-semibold text-brand-neon-pink uppercase tracking-widest font-mono mb-4">
                    On This Page
                </div>
                <ul className="space-y-2 border-l border-brand-neon-blue/20">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            style={{ paddingLeft: `${(heading.level - 2) * 12 + 12}px` }}
                        >
                            <button
                                onClick={() => scrollToHeading(heading.id)}
                                className={`
                                    text-left text-sm transition-all duration-200 w-full
                                    ${activeId === heading.id
                                        ? 'text-brand-neon-blue font-medium border-l-2 border-brand-neon-blue -ml-[1px] pl-3'
                                        : 'text-text-muted hover:text-text-primary pl-3'
                                    }
                                `}
                            >
                                {heading.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
