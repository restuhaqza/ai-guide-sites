
const modules = import.meta.glob('../contents/*.md', { query: '?raw', import: 'default' });


interface DocMetadata {
    title?: string;
    description?: string;
    [key: string]: any;
}

interface DocResult {
    content: string;
    meta: DocMetadata;
}

export async function getDocContent(slug: string): Promise<DocResult | null> {
    const path = `../contents/${slug}.md`;
    if (!modules[path]) {
        return null;
    }
    const rawContent = await modules[path]() as string;

    // Simple frontmatter parser
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = rawContent.match(frontmatterRegex);

    if (match) {
        const metaBlock = match[1];
        const content = match[2];
        const meta: DocMetadata = {};

        metaBlock.split('\n').forEach(line => {
            const [key, ...value] = line.split(':');
            if (key && value) {
                meta[key.trim()] = value.join(':').trim();
            }
        });

        return { content, meta };
    }

    return { content: rawContent, meta: {} };
}
