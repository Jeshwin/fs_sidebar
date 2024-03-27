import {DocumentPlusIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import {useContext, useEffect, useRef, useState} from "react";
import NewElementContext from "../context/newElementProvider";
import FileStructureContext from "../context/fileStructureProvider";
import Modal from "../modal";

export default function NewItem() {
    const {
        currentFile,
        showNewElementInput,
        setShowNewElementInput,
        fileOrFolder,
    } = useContext(NewElementContext);
    const {addItem} = useContext(FileStructureContext);
    const newElementInputRef = useRef();
    const [newElementName, setNewElementName] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                newElementInputRef.current &&
                !newElementInputRef.current.contains(event.target)
            ) {
                setShowNewElementInput(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [setShowNewElementInput]);

    // Count the number of slashes in the current file path
    const slashCount =
        currentFile.split("/").length == 0
            ? 0
            : currentFile.split("/").length - 1;

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const currentFilePath = currentFile.substring(
                0,
                currentFile.length - 1
            );
            console.log(`Adding ${newElementName} inside ${currentFilePath}`);
            const newElement = {
                type: fileOrFolder,
                name: newElementName,
            };
            if (fileOrFolder === "dir") {
                newElement.contents = [];
                newElement.open = false;
            }
            setShowModal(!addItem(currentFilePath, newElement));
            // Hide the input
            setNewElementName("");
            setShowNewElementInput(false);
        }
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
        showNewElementInput && (
            <>
                {showModal && (
                    <Modal
                        handleReplace={handleReplace}
                        handleRename={handleRename}
                        handleSkip={handleSkip}
                    />
                )}
                <li
                    ref={newElementInputRef}
                    style={{
                        marginLeft: `${16 * slashCount + 4}px`,
                    }}
                    className="h-8 flex items-center p-1 cursor-pointer rounded-lg bg-gray-700
            border border-transparent focus-within:ring-1 focus-within:ring-indigo-500"
                >
                    {fileOrFolder === "file" ? (
                        <DocumentPlusIcon className="w-6 h-6" />
                    ) : (
                        <FolderPlusIcon className="w-6 h-6" />
                    )}
                    <input
                        value={newElementName}
                        onChange={(e) => setNewElementName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={
                            fileOrFolder === "file"
                                ? "Add file..."
                                : "Add directory..."
                        }
                        className="h-6 bg-inherit p-1 flex-1 focus:outline-none"
                    />
                </li>
            </>
        )
    );
}
