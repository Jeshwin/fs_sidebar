import {useState, useContext, useRef} from "react";

import FileStructureContext from "../context/fileStructureProvider";
import TooltipPositionContext from "../context/tooltipProvider";
import Modal from "../modal";
import {DocumentIcon, EllipsisVerticalIcon} from "@heroicons/react/24/outline";
import NewElementContext from "../context/newElementProvider";

export default function FileItem({item, parent, level}) {
    const {addItem, deleteFile, deleteFolder} =
        useContext(FileStructureContext);
    const {setCurrentFile} = useContext(NewElementContext);
    const {setTooltipPosition, tooltipInfo, setTooltipInfo} = useContext(
        TooltipPositionContext
    );
    const [showModal, setShowModal] = useState(false);
    const [showDots, setShowDots] = useState(false);
    const VertDotsRef = useRef(null);

    const styleColor = item.name[0].match(/[a-z]/i) // Check if first character is a letter
        ? `var(--${item.name[0].toUpperCase()})`
        : "#9D9D9D";
    const filePath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleClick = () => {
        console.log(`Selected ${filePath}`);
        setCurrentFile(filePath);
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({
                type: "file",
                path: filePath,
            })
        );
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedData = JSON.parse(
            event.dataTransfer.getData("text/plain")
        );
        const targetPath = parent;
        const sourcePath = droppedData.path;

        // Implement logic to handle dropping onto files and folders
        // Can't add folder into itself!
        if (sourcePath === targetPath) {
            return;
        }

        // Get last name in path to get filename
        const sourcePathArray = sourcePath.split("/");
        const itemName = sourcePathArray[sourcePathArray.length - 1];
        const newElement = {
            type: droppedData.type,
            name: itemName,
        };
        if (droppedData.type === "dir") {
            newElement.contents = [];
            newElement.open = false;
        }
        console.log(
            `Adding ${newElement.type} ${newElement.name} onto ${targetPath}`
        );
        if (addItem(targetPath, newElement)) {
            droppedData.type === "file"
                ? deleteFile(sourcePath)
                : deleteFolder(sourcePath);
        } else {
            setShowModal(true);
        }
    };

    const handleMouseEnter = () => {
        setShowDots(true);
    };

    const handleMouseLeave = () => {
        setShowDots(false);
    };

    const toggleTooltip = (e) => {
        e.stopPropagation();
        // Function to handle button click
        const rect = VertDotsRef.current.getBoundingClientRect();
        setTooltipPosition({x: rect.x + 44, y: rect.y - 8});
        setTooltipInfo({
            type: "file",
            path: tooltipInfo.path == filePath ? "" : filePath,
        });
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Function to handle button click and capture mouse position
        setTooltipPosition({x: e.clientX, y: e.clientY});
        setTooltipInfo({
            type: "file",
            path: tooltipInfo.path == filePath ? "" : filePath,
        });
    };

    const handleReplace = () => {
        // Handle replace action
        console.log("Replace action triggered");
        setShowModal(false);
    };

    const handleRename = () => {
        // Handle rename action
        console.log("Rename action triggered");
        setShowModal(false);
    };

    const handleSkip = () => {
        // Handle skip action
        console.log("Skip action triggered");
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <Modal
                    handleReplace={handleReplace}
                    handleRename={handleRename}
                    handleSkip={handleSkip}
                />
            )}
            <li
                id={filePath}
                style={{
                    marginLeft: `${level * 16 + 4}px`,
                }}
                className="flex items-center p-1 cursor-pointer rounded-lg hover:bg-gray-700"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <DocumentIcon
                    style={{
                        color: styleColor,
                    }}
                    className="w-6 h-6 mr-1"
                />
                <span className="flex-1">{item.name}</span>
                {showDots && (
                    <button
                        ref={VertDotsRef}
                        className="rounded hover:bg-gray-800"
                        onClick={toggleTooltip}
                    >
                        <EllipsisVerticalIcon className="w-6 h-6" />
                    </button>
                )}
            </li>
        </>
    );
}
