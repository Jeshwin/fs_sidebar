import FileStructureContext from "../context/fileStructureProvider";
import FolderIcon from "../icons/folder";
import OpenFolderIcon from "../icons/openFolder";
import FileItem from "./file";
import Modal from "../modal";
import {useState, useContext, Fragment} from "react";
import VerticalDots from "../icons/vdots";

export default function FolderItem({item, parent, level}) {
    const {toggleFolder, addFile, addFolder, deleteFile, deleteFolder} =
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
    const folderPath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleToggleFolder = () => {
        console.log(`Selected ${folderPath}`);
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
        setShowTooltip(!showTooltip);
    };

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
                className="flex items-center p-1 cursor-pointer rounded-lg hover:bg-slate-700"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleToggleFolder}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {item.open ? (
                    <OpenFolderIcon color={styleColor} />
                ) : (
                    <FolderIcon color={styleColor} />
                )}
                <span className="flex-1">{item.name}</span>
                {showDots && (
                    <Fragment>
                        <button
                            className="rounded hover:bg-slate-800"
                            onClick={toggleTooltip}
                        >
                            <VerticalDots />
                        </button>
                        {showTooltip && (
                            <div className="absolute p-1 rounded shadow bg-sky-900">
                                Yo yo yo!
                            </div>
                        )}
                    </Fragment>
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
        </>
    );
}
