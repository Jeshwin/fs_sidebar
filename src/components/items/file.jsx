import {useState, useContext} from "react";

import FileStructureContext from "../context/fileStructureProvider";
import FileIcon from "../icons/file";
import Modal from "../modal";
import VerticalDots from "../icons/vdots";
import ToolTipMenu from "../tooltipMenu";

export default function FileItem({item, parent, level}) {
    const {addFile, addFolder, deleteFile, deleteFolder} =
        useContext(FileStructureContext);
    const [showModal, setShowModal] = useState(false);
    const [showDots, setShowDots] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

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

    const styleColor = `var(--${item.name[0].toUpperCase()})`;
    const filePath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleClick = () => {
        console.log(`Selected ${filePath}`);
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
        setShowTooltip(!showTooltip);
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
                className="flex items-center p-1 cursor-pointer rounded-lg hover:bg-slate-700"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FileIcon color={styleColor} />
                <span className="flex-1">{item.name}</span>
                {showDots && (
                    <button
                        className="rounded hover:bg-slate-800"
                        onClick={toggleTooltip}
                    >
                        <VerticalDots />
                    </button>
                )}
                {showTooltip && <ToolTipMenu path={filePath} />}
            </li>
        </>
    );
}
