import { useState, useEffect } from 'react';

const modules = import.meta.glob('../contents/*.md', { query: '?raw', import: 'default' });

export interface SearchResult {
    slug: string;
    title: string;
    description: string;
    matchType: 'title' | 'content';
    snippet: string;
}

export function useSearch() {
    const [index, setIndex] = useState<any[]>([]);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Build search index on mount
    useEffect(() => {
        async function buildIndex() {
            const items = [];
            for (const path in modules) {
                const rawContent = await modules[path]() as string;
                const slug = path.split('/').pop()?.replace('.md', '') || '';

                // Parse frontmatter
                const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
                const match = rawContent.match(frontmatterRegex);

                let title = slug;
                let description = '';
                let content = rawContent;

                if (match) {
                    const metaBlock = match[1];
                    content = match[2];

                    const meta: any = {};
                    metaBlock.split('\n').forEach(line => {
                        const [key, ...value] = line.split(':');
                        if (key && value) meta[key.trim()] = value.join(':').trim();
                    });

                    if (meta.title) title = meta.title.replace(/^['"]|['"]$/g, '');
                    if (meta.description) description = meta.description.replace(/^['"]|['"]$/g, '');
                }

                items.push({ slug, title, description, content });
            }
            setIndex(items);
        }

        buildIndex();
    }, []);

    const search = (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const q = query.toLowerCase();
        const hits: SearchResult[] = [];

        index.forEach(item => {
            // Priority 1: Title match
            if (item.title.toLowerCase().includes(q)) {
                hits.push({
                    slug: item.slug,
                    title: item.title,
                    description: item.description,
                    matchType: 'title',
                    snippet: item.description || ''
                });
                return;
            }

            // Priority 2: Content match
            const contentIndex = item.content.toLowerCase().indexOf(q);
            if (contentIndex !== -1) {
                // Extract snippet around match
                const start = Math.max(0, contentIndex - 40);
                const end = Math.min(item.content.length, contentIndex + 60);
                const snippet = '...' + item.content.substring(start, end) + '...';

                hits.push({
                    slug: item.slug,
                    title: item.title,
                    description: item.description,
                    matchType: 'content',
                    snippet
                });
            }
        });

        setResults(hits);
        setIsSearching(false);
    };

    return { search, results, isSearching };
}
