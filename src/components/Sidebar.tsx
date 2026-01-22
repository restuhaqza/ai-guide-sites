import { NavLink } from 'react-router-dom';
import { Book, Shield, Zap, Terminal } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const navGroups = [
        {
            title: "Start Here",
            items: [
                { name: 'Introduction', path: '/', icon: Book },
                { name: 'Core Concepts', path: '/docs/core-concepts', icon: Zap },
                { name: 'Embeddings Guide', path: '/docs/embeddings-guide', icon: Book },
                { name: 'Vector Databases', path: '/docs/vector-databases', icon: Zap },
                { name: 'RAG Architectures', path: '/docs/rag-architectures', icon: Zap },
            ]
        },
        {
            title: "Prompts",
            items: [
                { name: 'Standards', path: '/docs/prompt-engineering-standards', icon: Zap },
            ]
        },
        {
            title: "Agents",
            items: [
                { name: 'Single-Agent Patterns', path: '/docs/single-agent-patterns', icon: Shield },
                { name: 'Multi-Agent Architectures', path: '/docs/multi-agent-architectures', icon: Shield },
                { name: 'Memory Systems', path: '/docs/memory-systems', icon: Zap },
                { name: 'AGENTS.md', path: '/docs/agents-standard', icon: Book },
                { name: 'Agent Skills', path: '/docs/agent-skills-guide', icon: Zap },
                { name: 'OpenCode Guide', path: '/docs/opencode-guide', icon: Terminal },
            ]
        },
        {
            title: "Protocols",
            items: [
                { name: 'MCP & Tools', path: '/docs/mcp-and-tools', icon: Book },
                { name: 'Structured Outputs', path: '/docs/structured-outputs', icon: Zap },
            ]
        },
        {
            title: "Evaluation & Security",
            items: [
                { name: 'Evaluation Guide', path: '/docs/evaluation-guide', icon: Shield },
                { name: 'LLM Red Teaming', path: '/docs/llm-red-teaming', icon: Shield },
            ]
        }
    ];

    return (
        <aside
            className={clsx(
                "bg-background-deep-mainframe border-r border-brand-neon-blue/20 transition-all duration-300 overflow-y-auto",
                isOpen ? "w-64" : "w-0 overflow-hidden"
            )}
        >
            <div className="p-4 font-bold text-xl border-b border-brand-neon-blue/20 h-16 flex items-center tracking-wider text-brand-neon-blue italic">
                AI Guide
            </div>
            <nav className="p-2 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.title}>
                        <div className="px-4 mb-2 text-xs font-semibold text-brand-neon-pink uppercase tracking-widest font-mono">
                            {group.title}
                        </div>
                        <div className="space-y-1">
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                            isActive
                                                ? "bg-brand-neon-blue/10 text-brand-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                                : "text-text-secondary/80 hover:bg-white/10 hover:text-white"
                                        )
                                    }
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
