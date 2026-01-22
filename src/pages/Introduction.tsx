import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Cpu, Terminal, Zap } from 'lucide-react';

export default function Introduction() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
            {/* Retro Background Effects */}
            <div className="absolute inset-0 bg-background-void overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-brand-neon-purple)_0%,_transparent_70%)] opacity-20 blur-3xl"></div>
                <div className="retro-grid"></div>
            </div>

            {/* Scanline Overlay */}
            <div className="scanline opacity-10"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">

                {/* Hero Section */}
                <div className="mb-16 space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-brand-neon-blue/30 bg-brand-neon-blue/10 backdrop-blur-sm text-brand-neon-blue text-sm font-mono tracking-wider mb-4 animate-pulse">
                        SYSTEM ONLINE v1.0.0
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight italic">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon-blue via-brand-neon-pink to-brand-electric-purple drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                            AI GUIDE
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-light border-l-2 border-brand-neon-pink/50 pl-6 italic">
                        "Make it your AI Agentic more smart"
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Link
                            to="/docs/core-concepts"
                            className="group relative px-8 py-3 bg-brand-neon-blue text-black font-bold text-lg rounded-none skew-x-[-10deg] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                        >
                            <span className="block skew-x-[10deg] flex items-center gap-2">
                                INITIALIZE LEARNING <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>
                        <Link
                            to="/docs/single-agent-patterns"
                            className="group relative px-8 py-3 bg-transparent text-brand-neon-pink font-bold text-lg rounded-none skew-x-[-10deg] border-2 border-brand-neon-pink hover:bg-brand-neon-pink hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                        >
                            <span className="block skew-x-[10deg] flex items-center gap-2">
                                EXPLORE AGENTS <Bot className="w-5 h-5" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
                    {[
                        {
                            title: "Core Concepts",
                            desc: "Master the fundamentals of Agentic AI systems and architecture.",
                            icon: Cpu,
                            path: "/docs/core-concepts",
                            color: "border-brand-neon-blue"
                        },
                        {
                            title: "Prompt Engineering",
                            desc: "Standardized protocols for communicating with Large Language Models.",
                            icon: Terminal,
                            path: "/docs/prompt-engineering-standards",
                            color: "border-brand-neon-pink"
                        },
                        {
                            title: "MCP Protocols",
                            desc: "Tools and patterns for Model Context Protocol integration.",
                            icon: Zap,
                            path: "/docs/mcp-and-tools",
                            color: "border-brand-electric-purple"
                        }
                    ].map((feature, index) => (
                        <Link
                            key={index}
                            to={feature.path}
                            className={`group relative p-6 bg-background-deep-mainframe border-l-4 ${feature.color} hover:-translate-y-2 transition-transform duration-300 overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <feature.icon className={`w-8 h-8 mb-4 ${feature.color.replace('border-', 'text-')} opacity-80 group-hover:opacity-100 group-hover:shadow-neon-glow`} />
                            <h3 className="text-xl font-bold mb-2 font-mono uppercase tracking-wider">{feature.title}</h3>
                            <p className="text-text-muted text-sm group-hover:text-text-primary transition-colors">{feature.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
