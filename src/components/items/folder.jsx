import FileStructureContext from "../context/fileStructureProvider";
import FileItem from "./file";
import Modal from "../modal";
import {useState, useContext, useRef, useEffect} from "react";
import {
    FolderIcon,
    FolderOpenIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import TooltipPositionContext from "../context/tooltipProvider";
import NewItem from "./newelement";
import NewElementFolderContext from "../context/newElementFolderProvider";

export default function FolderItem({item, parent, level}) {
    const {
        toggleFolder,
        setFolderOpen,
        addFile,
        addFolder,
        deleteFile,
        deleteFolder,
    } = useContext(FileStructureContext);
    const {setTooltipPosition, tooltipInfo, setTooltipInfo} = useContext(
        TooltipPositionContext
    );
    const {newElementFolder, showNewElementInput} = useContext(
        NewElementFolderContext
    );
    const [showModal, setShowModal] = useState(false);
    const [showDots, setShowDots] = useState(false);
    const VertDotsRef = useRef(null);

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

    const styleColor = item.name[0].match(/[a-z]/i) // Check if first character is a letter
        ? `var(--${item.name[0].toUpperCase()})`
        : "#9D9D9D";
    const folderPath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleToggleFolder = () => {
        toggleFolder(folderPath);
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({
                type: "dir",
                path: folderPath,
                open: item.open,
                contents: item.contents,
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
        const targetPath = folderPath;
        const sourcePath = droppedData.path;

        // Can't add folder into itself!
        if (sourcePath === targetPath) {
            return;
        }

        if (droppedData.type === "file") {
            // Get last name in path to get filename
            const sourcePathArray = sourcePath.split("/");
            const fileName = sourcePathArray[sourcePathArray.length - 1];
            console.log(`Adding file ${fileName} onto ${targetPath}`);
            if (addFile(targetPath, {name: fileName})) {
                deleteFile(sourcePath);
            } else {
                setShowModal(true);
            }
        } else if (droppedData.type === "dir") {
            const sourcePathArray = sourcePath.split("/");
            const folderName = sourcePathArray[sourcePathArray.length - 1];
            console.log(`Adding folder ${folderName} onto ${targetPath}`);
            if (
                addFolder(targetPath, {
                    name: folderName,
                    contents: droppedData.contents,
                    open: droppedData.open,
                })
            ) {
                deleteFolder(sourcePath);
            } else {
                setShowModal(true);
            }
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
            type: "dir",
            path: tooltipInfo.path == folderPath ? "" : folderPath,
        });
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Function to handle button click and capture mouse position
        setTooltipPosition({x: e.clientX, y: e.clientY});
        setTooltipInfo({
            type: "dir",
            path: tooltipInfo.path == folderPath ? "" : folderPath,
        });
    };

    useEffect(() => {
        if (newElementFolder.includes(folderPath) && showNewElementInput) {
            setFolderOpen(folderPath, true);
        }
    }, [newElementFolder, showNewElementInput]);

    return (
        <>
            {/* Render the modal if showModal state is true */}
            {showModal && (
                <Modal
                    handleReplace={handleReplace}
                    handleRename={handleRename}
                    handleSkip={handleSkip}
                />
            )}
            <li
                id={folderPath}
                style={{
                    marginLeft: `${level * 16 + 4}px`,
                }}
                className="flex items-center p-1 cursor-pointer rounded-lg hover:bg-gray-700"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleToggleFolder}
                onContextMenu={handleContextMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.open ? (
                    <FolderOpenIcon
                        style={{
                            color: styleColor,
                        }}
                        className="w-6 h-6 mr-1"
                    />
                ) : (
                    <FolderIcon
                        style={{
                            color: styleColor,
                        }}
                        className="w-6 h-6 mr-1"
                    />
                )}
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
            {item.open &&
                item.contents.map((child_item) => {
                    if (child_item.type === "file") {
                        return (
                            <FileItem
                                key={child_item.name}
                                item={child_item}
                                parent={folderPath}
                                level={level + 1}
                            />
                        );
                    } else {
                        return (
                            <FolderItem
                                key={child_item.name}
                                item={child_item}
                                parent={folderPath}
                                level={level + 1}
                            />
                        );
                    }
                })}
            {newElementFolder.substring(
                0,
                newElementFolder.lastIndexOf("/")
            ) === folderPath && (
                <>
                    <NewItem />
                </>
            )}
        </>
    );
}
