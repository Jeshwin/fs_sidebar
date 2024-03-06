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
            <>
                <svg
                    width="12"
                    height="24"
                    viewBox="0 0 12 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-20 w-3 h-6 fill-gray-700 stroke-gray-500"
                    style={{
                        left: `${tooltipPosition.x - 11}px`,
                        top: `${tooltipPosition.y + 8}px`,
                    }}
                >
                    <g clipPath="url(#clip0_1_2)">
                        <rect
                            width="12"
                            height="24"
                            fill="transparent"
                            strokeWidth={0}
                        />
                        <path d="M11.5 0V24" className="stroke-gray-700" />
                        <path d="M11.5 0C11.5 6 0.5 6 0.5 12C0.5 18 11.5 18 11.5 24" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_2">
                            <rect
                                width="12"
                                height="24"
                                fill="transparent"
                                strokeWidth={0}
                            />
                        </clipPath>
                    </defs>
                </svg>
                <div
                    id="tooltip-menu"
                    className="absolute min-w-48 overflow-y-scroll z-10 border border-gray-500 rounded-md bg-gray-700 text-white shadow-lg"
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
                    {/* Tooltip Pointer */}

                    <div className="sticky z-10 top-0 p-2 bg-gray-700 text-sm font-light text-gray-200 border-b border-gray-500">
                        {tooltipPath}
                    </div>
                    <ul className="my-2">
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <PencilSquareIcon className="w-5 h-5" />
                            Rename
                        </li>
                    </ul>
                    <div className="h-px bg-gray-500"></div>
                    <ul className="my-2">
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            Open
                        </li>
                    </ul>
                    <div className="h-px bg-gray-500"></div>
                    <ul className="my-2">
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                            Search in file
                        </li>
                    </ul>
                    <div className="h-px bg-gray-500"></div>
                    <ul className="my-2">
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <ClipboardIcon className="w-5 h-5" />
                            Copy contents
                        </li>
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <MapPinIcon className="w-5 h-5" />
                            Copy path
                        </li>
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <LinkIcon className="w-5 h-5" />
                            Copy link
                        </li>
                    </ul>
                    <div className="h-px bg-gray-500"></div>
                    <ul className="my-2">
                        <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                            Download
                        </li>
                        <li className="p-2 hover:bg-red-600 hover:bg-opacity-35 flex items-center gap-2 cursor-pointer">
                            <TrashIcon className="stroke-red-400 w-5 h-5" />
                            Delete
                        </li>
                    </ul>
                </div>
            </>
        )
    );
}
