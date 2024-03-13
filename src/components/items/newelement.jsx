import {DocumentPlusIcon, FolderPlusIcon} from "@heroicons/react/24/outline";
import {useContext} from "react";
import NewElementFolderContext from "../context/newElementFolderProvider";

export default function NewItem() {
    const {newElementFolder, showNewElementInput, fileOrFolder} = useContext(
        NewElementFolderContext
    );

    // Count the number of slashes in the current file path
    const slashCount = newElementFolder.split("/").length;

    return (
        showNewElementInput && (
            <li
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
                    placeholder={
                        fileOrFolder === "file"
                            ? "Add file..."
                            : "Add directory..."
                    }
                    className="h-6 bg-inherit p-1 flex-1 focus:outline-none"
                />
            </li>
        )
    );
}
