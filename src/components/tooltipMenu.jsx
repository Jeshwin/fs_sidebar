import {useContext, useState, useEffect, useRef} from "react";
import TooltipPositionContext from "./context/tooltipProvider";
import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    ArrowsUpDownIcon,
    ClipboardIcon,
    DocumentPlusIcon,
    FolderPlusIcon,
    LinkIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function ToolTipMenu() {
    const {tooltipPosition, tooltipInfo, setTooltipInfo} = useContext(
        TooltipPositionContext
    );
    const [calculatedDimensions, setCalculatedDimensions] = useState({
        pointerLeft: 0,
        pointerTop: 0,
        menuLeft: 0,
        menuTop: 0,
        menuHeight: 0,
    });
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                tooltipInfo.path !== ""
            ) {
                setTooltipInfo({path: "", type: tooltipInfo.type});
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [tooltipInfo, setTooltipInfo]);

    useEffect(() => {
        setCalculatedDimensions({
            menuLeft: tooltipPosition.x,
            menuTop: Math.min(
                tooltipPosition.y,
                window.innerHeight - (204 + 8)
            ),
            menuHeight: Math.min(
                tooltipInfo.type === "file" ? 436 : 492,
                window.innerHeight - tooltipPosition.y - 8
            ),
        });
    }, [tooltipInfo, tooltipPosition]);

    const menuContents =
        tooltipInfo.type === "file" ? (
            <>
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
                <ul className="mt-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Download
                    </li>
                    <li className="p-2 hover:bg-red-600 hover:bg-opacity-35 flex items-center gap-2 cursor-pointer">
                        <TrashIcon className="stroke-red-400 w-5 h-5" />
                        Delete
                    </li>
                </ul>
            </>
        ) : (
            <>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <PencilSquareIcon className="w-5 h-5" />
                        Rename
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <DocumentPlusIcon className="w-5 h-5" />
                        Add file
                    </li>
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <FolderPlusIcon className="w-5 h-5" />
                        Add folder
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                        Search in folder
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <ArrowsUpDownIcon className="w-5 h-5" />
                        Collapse children
                    </li>
                </ul>
                <div className="h-px bg-gray-500"></div>
                <ul className="my-2">
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
                <ul className="mt-2">
                    <li className="p-2 hover:bg-gray-600 flex items-center gap-2 cursor-pointer">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Download
                    </li>
                    <li className="p-2 hover:bg-red-600 hover:bg-opacity-35 flex items-center gap-2 cursor-pointer">
                        <TrashIcon className="stroke-red-400 w-5 h-5" />
                        Delete
                    </li>
                </ul>
            </>
        );

    return (
        tooltipInfo.path !== "" && (
            <>
                <div
                    id="tooltip-menu"
                    ref={menuRef}
                    className="absolute min-w-48 overflow-y-scroll z-10 border border-gray-500 rounded-md bg-gray-700 text-white shadow-lg"
                    style={{
                        left: `${calculatedDimensions.menuLeft}px`,
                        top: `${calculatedDimensions.menuTop}px`,
                        height: `${calculatedDimensions.menuHeight}px`,
                        minHeight: "204px",
                    }}
                >
                    <div className="sticky z-10 top-0 p-2 bg-gray-700 text-sm font-light text-gray-200 border-b border-gray-500">
                        {tooltipInfo.path}
                    </div>
                    {menuContents}
                </div>
            </>
        )
    );
}
