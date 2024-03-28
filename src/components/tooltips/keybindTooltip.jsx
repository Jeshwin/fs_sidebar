import {useState, useRef, useEffect} from "react";

export default function Tooltip({children, text, keybind}) {
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
        showTimeout.current = setTimeout(() => setShowTooltip(true), 150);
    };

    const handleMouseLeave = () => {
        // Clear the show timeout
        if (showTimeout.current) {
            clearTimeout(showTimeout.current);
        }
        // Set timeout to hide the tooltip
        hideTimeout.current = setTimeout(() => setShowTooltip(false), 10);
    };

    const handleClick = () => {
        // Clear timeouts
        clearTimeout(showTimeout.current);
        clearTimeout(hideTimeout.current);
        // Hide tooltip immediately
        setShowTooltip(false);
    };

    useEffect(() => {
        // Prevent tootip from overflowing
        if (showTooltip) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const tooltipWidth = tooltipRect.width;
            const tooltipRight = tooltipRect.right + tooltipWidth; // Calculate the right edge including the width

            if (window.innerWidth < tooltipRight + 10) {
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

    const renderKeybind = () => {
        // Edge case: keybind is empty (No keybinds for tooltip)
        if (!keybind) return;
        // Determine the keybind based on the operating system
        let os = "windows"; // For demonstration purpose
        let keybindArray = keybind.windows; // Default to Windows keybind
        switch (os) {
            case "mac":
                keybindArray = keybind.mac;
                break;
            case "linux":
                keybindArray = keybind.linux;
                break;
            default:
                break;
        }

        // Function to render each key in the keybind
        const renderKey = (key, index) => {
            return (
                <div
                    key={index}
                    className="w-4 h-4 m-px grid place-content-center rounded text-xs dark:text-slate-300 bg-slate-300 dark:bg-slate-900
                    border border-black dark:border-slate-300"
                >
                    {renderKeyIcon(key)}
                </div>
            );
        };

        // Function to render the icon or character for each key
        const renderKeyIcon = (key) => {
            // Add logic here to render Unicode characters or icons for special keys
            switch (key) {
                case "Control":
                    return "⌃";
                case "Command":
                    return "⌘";
                case "Option":
                    return "⌥";
                case "Shift":
                    return "⇧";
                case "Super":
                    return "⊞";
                default:
                    return key;
            }
        };

        // Render each key in the keybind
        return keybindArray.map((key, index) => renderKey(key, index));
    };

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
                    className={`absolute top-full ${tooltipPosition} mt-2 w-max p-2 flex items-center dark:text-white bg-slate-200 dark:bg-slate-950 rounded-md z-10`}
                >
                    <p className="text-sm">{text}</p>
                    {keybind && (
                        <div className="flex items-center ml-1">
                            {renderKeybind()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
