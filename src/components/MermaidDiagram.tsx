import { useEffect, useRef, useId, useState, useCallback, useLayoutEffect } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    definition: string;
}

export default function MermaidDiagram({ definition }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const reactId = useId();
    const [isRendered, setIsRendered] = useState(false);

    // Pan and zoom state - start with scale 1, will auto-fit after render
    const [scale, setScale] = useState(1);
    const [initialScale, setInitialScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const positionStart = useRef({ x: 0, y: 0 });

    // Create a stable ID that's valid for SVG (no colons from useId)
    const stableId = useRef(`mermaid-${reactId.replace(/:/g, '')}-${Math.random().toString(36).substr(2, 5)}`);

    // Auto-fit function to calculate optimal scale
    const calculateFitScale = useCallback(() => {
        if (!containerRef.current || !svgContainerRef.current) return 1;

        const svg = svgContainerRef.current.querySelector('svg');
        if (!svg) return 1;

        const containerRect = containerRef.current.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        // Get the actual SVG dimensions (unscaled)
        const svgWidth = svg.viewBox?.baseVal?.width || svgRect.width || 400;
        const svgHeight = svg.viewBox?.baseVal?.height || svgRect.height || 200;

        // Calculate scale to fit with some padding
        const containerWidth = containerRect.width - 40; // padding
        const containerHeight = containerRect.height - 40; // padding

        const scaleX = containerWidth / svgWidth;
        const scaleY = containerHeight / svgHeight;

        // Use the smaller scale to ensure it fits both dimensions
        // Clamp between 0.5 and 2 for reasonable viewing
        return Math.min(Math.max(Math.min(scaleX, scaleY), 0.5), 2);
    }, []);

    // Auto-fit handler
    const handleAutoFit = useCallback(() => {
        const fitScale = calculateFitScale();
        setScale(fitScale);
        setInitialScale(fitScale);
        setPosition({ x: 0, y: 0 });
    }, [calculateFitScale]);

    // Zoom handlers
    const handleZoomIn = useCallback(() => {
        setScale(prev => Math.min(prev + 0.25, 3));
    }, []);

    const handleZoomOut = useCallback(() => {
        setScale(prev => Math.max(prev - 0.25, 0.5));
    }, []);

    const handleReset = useCallback(() => {
        handleAutoFit();
    }, [handleAutoFit]);

    // Mouse wheel zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale(prev => Math.min(Math.max(prev + delta, 0.5), 3));
    }, []);

    // Drag handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        positionStart.current = { ...position };
    }, [position]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setPosition({
            x: positionStart.current.x + dx,
            y: positionStart.current.y + dy
        });
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Render mermaid diagram
    useEffect(() => {
        if (!svgContainerRef.current || isRendered) return;

        // Initialize mermaid with dark theme and high-contrast visible colors
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'base',
            themeVariables: {
                // Node colors - bright and visible
                primaryColor: '#0f1729',
                primaryTextColor: '#ffffff',
                primaryBorderColor: '#00d4ff',
                // Line/edge colors
                lineColor: '#ff00ff',
                // Secondary elements
                secondaryColor: '#1a0a2e',
                secondaryTextColor: '#ffffff',
                secondaryBorderColor: '#ff00ff',
                // Tertiary elements
                tertiaryColor: '#0d2137',
                tertiaryTextColor: '#ffffff',
                tertiaryBorderColor: '#00d4ff',
                // Background colors
                background: '#0a0a0f',
                mainBkg: '#0f1729',
                // Node styling
                nodeBorder: '#00d4ff',
                nodeTextColor: '#ffffff',
                // Cluster styling
                clusterBkg: '#0d1a2d',
                clusterBorder: '#ff00ff',
                // Labels and text
                titleColor: '#00d4ff',
                edgeLabelBackground: '#0a0a0f',
                textColor: '#ffffff',
                // Font
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
            flowchart: {
                htmlLabels: true,
                curve: 'basis',
                padding: 20,
                nodeSpacing: 60,
                rankSpacing: 60,
                diagramPadding: 15,
                useMaxWidth: false,
            },
        });

        const renderDiagram = async () => {
            try {
                const svgId = `${stableId.current}-svg`;

                // Clear previous content
                if (svgContainerRef.current) svgContainerRef.current.innerHTML = '';

                // Remove any existing element with this ID to prevent conflicts
                const existingEl = document.getElementById(svgId);
                if (existingEl) {
                    existingEl.remove();
                }

                // mermaid.render returns an object with svg property
                const { svg } = await mermaid.render(svgId, definition);

                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = svg;
                    setIsRendered(true);
                }
            } catch (error) {
                console.error('Failed to render mermaid diagram:', error);
                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = `<p class="text-status-error text-sm font-mono">Failed to render diagram: ${error instanceof Error ? error.message : 'Unknown error'}</p>`;
                }
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(renderDiagram, 50);
        return () => clearTimeout(timer);
    }, [definition, isRendered]);

    // Auto-fit after SVG is rendered
    useLayoutEffect(() => {
        if (isRendered) {
            // Small delay to ensure SVG dimensions are calculated
            const timer = setTimeout(() => {
                handleAutoFit();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isRendered, handleAutoFit]);

    return (
        <div className="mermaid-diagram-wrapper relative">
            {/* Control buttons */}
            <div className="absolute top-2 right-2 z-10 flex gap-1">
                <button
                    onClick={handleZoomIn}
                    className="w-8 h-8 flex items-center justify-center bg-background-crt-black border border-brand-neon-blue/40 rounded text-brand-neon-blue hover:bg-brand-neon-blue/20 hover:border-brand-neon-blue transition-all text-lg font-bold"
                    title="Zoom In"
                >
                    +
                </button>
                <button
                    onClick={handleZoomOut}
                    className="w-8 h-8 flex items-center justify-center bg-background-crt-black border border-brand-neon-blue/40 rounded text-brand-neon-blue hover:bg-brand-neon-blue/20 hover:border-brand-neon-blue transition-all text-lg font-bold"
                    title="Zoom Out"
                >
                    −
                </button>
                <button
                    onClick={handleReset}
                    className="w-8 h-8 flex items-center justify-center bg-background-crt-black border border-brand-neon-pink/40 rounded text-brand-neon-pink hover:bg-brand-neon-pink/20 hover:border-brand-neon-pink transition-all text-sm"
                    title="Fit to View"
                >
                    ⤢
                </button>
            </div>

            {/* Zoom level indicator */}
            <div className="absolute top-2 left-2 z-10 text-xs text-brand-neon-blue/60 font-mono">
                {Math.round(scale * 100)}%
            </div>

            {/* Diagram container with pan/zoom */}
            <div
                ref={containerRef}
                className="mermaid-diagram overflow-hidden p-4 bg-background-crt-black border border-brand-neon-blue/20 rounded-lg min-h-[250px] cursor-grab active:cursor-grabbing flex items-center justify-center"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={svgContainerRef}
                    id={stableId.current}
                    className="flex justify-center items-center select-none"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: 'center center',
                        transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    }}
                />
            </div>

            {/* Help text */}
            <div className="text-xs text-text-primary/40 mt-1 text-center font-mono">
                Scroll to zoom • Drag to pan • Click ⤢ to fit
            </div>
        </div>
    );
}
