import { useState, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import SearchModal from './SearchModal';

interface HeaderProps {
    toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <header className="h-16 border-b border-brand-neon-blue/10 bg-background-deep-mainframe/80 backdrop-blur-md flex items-center px-6 sticky top-0 z-50 shadow-lg shadow-brand-neon-blue/5 transition-all duration-300">
                <button
                    onClick={toggleSidebar}
                    className="p-2 mr-4 rounded-lg hover:bg-white/5 text-text-primary transition-colors duration-200 focus:outline-none ring-1 ring-transparent focus:ring-brand-neon-blue/50"
                >
                    <Menu size={22} className="text-brand-neon-blue" />
                </button>
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="font-sans font-extrabold text-xl tracking-wider uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-brand-neon-blue via-brand-neon-pink to-brand-electric-purple drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                            Ai Guide
                        </div>
                        <div className="h-4 w-[1px] bg-white/10 hidden md:block mx-3"></div>
                        <div className="text-sm text-text-muted font-mono tracking-tight hidden md:block opacity-90 hover:opacity-100 transition-opacity">
                            Make it your AI Agentic more smart
                        </div>
                    </div>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm group"
                    >
                        <Search size={14} className="text-brand-neon-blue group-hover:text-brand-neon-pink transition-colors" />
                        <span className="text-text-muted hidden sm:inline">Search...</span>
                        <kbd className="hidden sm:inline-block font-mono text-xs bg-black/30 px-1.5 rounded text-text-muted/70 group-hover:text-text-muted transition-colors border border-white/10">
                            ⌘K
                        </kbd>
                    </button>
                </div>

                {/* Ambient glow line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-neon-blue/30 to-transparent"></div>
            </header>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
