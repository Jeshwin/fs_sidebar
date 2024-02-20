export default function Highlighter({y}) {
    return (
        <div
            id="highlighter"
            className="absolute left-0 h-8 w-[calc(100%-8px)] m-1 transition-all duration-150 pointer-events-none rounded opacity-35 bg-indigo-500"
            style={{
                top: `${y * 32}px`,
            }}
        ></div>
    );
}
