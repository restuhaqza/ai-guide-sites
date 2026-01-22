import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import MermaidDiagram from './MermaidDiagram';

interface MarkdownViewerProps {
    content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
    return (
        <div className="prose dark:prose-invert max-w-none text-text-primary prose-headings:text-brand-neon-blue prose-headings:italic prose-p:text-text-primary prose-li:text-text-primary prose-strong:text-brand-neon-pink prose-a:text-brand-neon-pink prose-code:text-brand-neon-pink prose-pre:bg-background-crt-black prose-pre:border prose-pre:border-brand-neon-blue/20">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        const isMermaid = match && match[1] === 'mermaid';

                        if (isMermaid) {
                            return <MermaidDiagram definition={String(children).replace(/\n$/, '')} />;
                        }

                        return <code {...rest} className={className}>{children}</code>;
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
