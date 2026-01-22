import { Menu } from 'lucide-react';

interface HeaderProps {
    toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
    return (
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

                {/* Optional: Add right side actions here if needed later */}
            </div>

            {/* Ambient glow line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-neon-blue/30 to-transparent"></div>
        </header>
    );
}
