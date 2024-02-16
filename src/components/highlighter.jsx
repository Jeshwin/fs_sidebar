export default function Highlighter({y}) {
    
    return (
        <div
            className="absolute left-0 h-8 w-[calc(100%-8px)] m-1 transition-all duration-150 pointer-events-none rounded border border-dashed border-[var(--primary)]"
            style={{
                top: `${y * 32}px`,
            }}
        ></div>
    );
}
