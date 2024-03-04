import {useContext, useEffect} from "react";
import TooltipPositionContext from "./context/tooltipPositionContext";

export default function ToolTipMenu() {
    const {tooltipPosition, tooltipPath, setTooltipPath} = useContext(
        TooltipPositionContext
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            const inMenu = event.target.closest("#tooltip-menu") === null;
            if (inMenu && tooltipPath !== "") {
                setTooltipPath("");
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [tooltipPath, setTooltipPath]);

    return (
        tooltipPath && (
            <div
                id="tooltip-menu"
                className="absolute min-w-48 z-50 bg-gray-700 border border-gray-500 text-white shadow-lg rounded-md"
                style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                }}
            >
                <div>
                    <div className="font-light text-sm text-gray-200 p-2">
                        {tooltipPath}
                    </div>
                    <div className="h-px bg-gray-500"></div>
                    <ul className="my-2">
                        <li className="p-2 hover:bg-gray-600 flex space-x-1">Rename</li>
                    </ul>
                    <div className="h-px bg-gray-500"></div>
                    <ul>
                        <li>Open</li>
                        <li>Search in File</li>
                        <li>Copy Contents</li>
                        <li>Copy Path</li>
                        <li>Copy Link</li>
                        <li>Download</li>
                        <li>Delete</li>
                    </ul>
                </div>
            </div>
        )
    );
}
