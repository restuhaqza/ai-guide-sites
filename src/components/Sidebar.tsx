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
                { name: 'Fine-tuning vs Context', path: '/docs/fine-tuning-vs-context', icon: Zap },
                { name: 'Embeddings Guide', path: '/docs/embeddings-guide', icon: Book },
                { name: 'Vector Databases', path: '/docs/vector-databases', icon: Zap },
                { name: 'RAG Architectures', path: '/docs/rag-architectures', icon: Zap },
            ]
        },
        {
            title: "Agent Patterns",
            items: [
                { name: 'Single-Agent Patterns', path: '/docs/single-agent-patterns', icon: Shield },
                { name: 'Multi-Agent Architectures', path: '/docs/multi-agent-architectures', icon: Shield },
                { name: 'Subagent & Orchestrator', path: '/docs/subagent-orchestrator', icon: Shield },
                { name: 'Memory Systems', path: '/docs/memory-systems', icon: Zap },
            ]
        },
        {
            title: "Building Agents",
            items: [
                { name: 'Agent Protocol', path: '/docs/agent-protocol', icon: Terminal },
                { name: 'Agent Skills', path: '/docs/agent-skills-guide', icon: Zap },
                { name: 'Prompts Standards', path: '/docs/prompt-engineering-standards', icon: Zap },
                { name: 'Structured Outputs', path: '/docs/structured-outputs', icon: Zap },
                { name: 'Tool Use & Function Calling', path: '/docs/tool-use-function-calling', icon: Zap },
            ]
        },
        {
            title: "Capabilities",
            items: [
                { name: 'Web Browsing', path: '/docs/web-browsing-skills', icon: Zap },
                { name: 'Code Execution', path: '/docs/code-execution-skills', icon: Terminal },
                { name: 'File Manipulation', path: '/docs/file-manipulation-skills', icon: Book },
                { name: 'Data Analysis', path: '/docs/data-analysis-skills', icon: Zap },
            ]
        },
        {
            title: "Infrastructure & Tools",
            items: [
                { name: 'Sandbox Environments', path: '/docs/sandbox-environments', icon: Shield },
                { name: 'Sprites.dev', path: '/docs/sprites-dev', icon: Shield },
                { name: 'Moltbot Configuration', path: '/docs/moltbot-guide', icon: Terminal },
                { name: 'OpenCode Guide', path: '/docs/opencode-guide', icon: Terminal },
                { name: 'MCP & Tools', path: '/docs/mcp-and-tools', icon: Book },
            ]
        },
        {
            title: "Reliability & Safety",
            items: [
                { name: 'Evaluation Guide', path: '/docs/evaluation-guide', icon: Shield },
                { name: 'Benchmarks Guide', path: '/docs/benchmarks-guide', icon: Shield },
                { name: 'Tracing & Observability', path: '/docs/tracing-observability', icon: Zap },
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
