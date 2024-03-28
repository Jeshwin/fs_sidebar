import {useState, useRef, useEffect} from "react";

export default function Tooltip({children, text}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState("left-0");
    const tooltipRef = useRef(null);
    const showTimeout = useRef(null);
    const hideTimeout = useRef(null);

    const handleMouseEnter = () => {
        // Clear existing hide timeout
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }
        // Set timeout to show the tooltip
        showTimeout.current = setTimeout(() => setShowTooltip(true), 500);
    };

    const handleMouseLeave = () => {
        // Clear the show timeout
        if (showTimeout.current) {
            clearTimeout(showTimeout.current);
        }
        // Set timeout to hide the tooltip
        hideTimeout.current = setTimeout(() => setShowTooltip(false), 500);
    };

    const handleClick = () => {
        // Clear timeouts
        clearTimeout(showTimeout.current);
        clearTimeout(hideTimeout.current);
        // Hide tooltip immediately
        setShowTooltip(false);
    };

    useEffect(() => {
        if (showTooltip) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            if (window.innerWidth < tooltipRect.right + 10) {
                // Adjusted to add a small buffer
                setTooltipPosition("right-0");
            } else {
                setTooltipPosition("left-0");
            }
        }
        // Cleanup
        return () => {
            clearTimeout(showTimeout.current);
            clearTimeout(hideTimeout.current);
        };
    }, [showTooltip]);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
            {showTooltip && (
                <div
                    ref={tooltipRef}
                    className={`absolute top-full ${tooltipPosition} mt-2 w-max p-2 text-white bg-black rounded-md z-10`}
                >
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
}
