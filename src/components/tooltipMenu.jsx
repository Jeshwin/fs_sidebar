import {useContext, useEffect} from "react";
import TooltipPositionContext from "./context/tooltipPositionContext";
import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    ClipboardIcon,
    LinkIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

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
                className="absolute min-w-48 overflow-y-scroll z-50 bg-gray-700 border border-gray-500 text-white shadow-lg rounded-md"
                style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${Math.min(
                        tooltipPosition.y,
                        window.screen.height - 204 - 94
                    )}px`,
                    height: `${Math.min(
                        436,
                        window.screen.height - 64 - tooltipPosition.y - 32
                    )}px`,
                    minHeight: "204px",
                }}
            >
                <div className="sticky z-50 top-0 p-2 bg-gray-700 text-sm font-light text-gray-200 border-b border-gray-500">
                    {tooltipPath}
                </div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <PencilSquareIcon className="w-5 h-5" />
                        Rename
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        Open
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                        Search in file
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <ClipboardIcon className="w-5 h-5" />
                        Copy contents
                    </li>
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5" />
                        Copy path
                    </li>
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        Copy link
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Download
                    </li>
                    <li className="p-2 hover:bg-red-600 hover:bg-opacity-35 flex items-center gap-2">
                        <TrashIcon className="stroke-red-400 w-5 h-5" />
                        Delete
                    </li>
                </ul>
            </div>
        )
    );
}
