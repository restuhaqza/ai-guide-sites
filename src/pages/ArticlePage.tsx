import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';
import TableOfContents from '../components/TableOfContents';
import ReadingProgress from '../components/ReadingProgress';
import { getDocContent } from '../lib/content';

export default function ArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<string | null>(null);
    const [meta, setMeta] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadContent() {
            if (!slug) return;

            try {
                setLoading(true);
                const result = await getDocContent(slug);
                if (result) {
                    setContent(result.content);
                    setMeta(result.meta);
                } else {
                    setContent(null);
                }
            } catch (error) {
                console.error('Failed to load article:', error);
                setContent(null);
            } finally {
                setLoading(false);
            }
        }

        loadContent();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-brand-neon-blue border-t-transparent rounded-full animate-spin-slow"></div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="p-8 text-center border border-status-error/30 bg-status-error/5 rounded-lg">
                <h1 className="text-2xl font-bold mb-2 text-status-error font-mono">ERROR 404: DATA NOT FOUND</h1>
                <p className="text-text-muted">The requested data fragment "{slug}" could not be retrieved from the mainframe.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <ReadingProgress />

            <div className="max-w-7xl mx-auto flex gap-12 items-start">
                <div className="flex-1 min-w-0">
                    {meta?.title && (
                        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-neon-blue to-brand-neon-pink italic tracking-wide">
                            {meta.title}
                        </h1>
                    )}
                    <MarkdownViewer content={content} />
                </div>

                {/* Table of Contents - Hidden on mobile/tablet, visible on XL screens */}
                <TableOfContents content={content} />
            </div>
        </div>
    );
}
