import {DocumentPlusIcon} from "@heroicons/react/24/outline";
import {useContext} from "react";
import CurrentFileContext from "../context/currentFileProvider";

export default function NewFileItem() {
    const {currentFile} = useContext(CurrentFileContext);

    // Count the number of slashes in the current file path
    const slashCount = currentFile.split("/").length - 1;

    return (
        <li
            style={{
                marginLeft: `${16 * slashCount + 4}px`,
            }}
            className="h-8 flex items-center p-1 cursor-pointer rounded-lg bg-gray-700
            border border-transparent focus-within:ring-1 focus-within:ring-indigo-500"
        >
            <DocumentPlusIcon className="w-6 h-6" />
            <input
                placeholder="Add file..."
                className="h-6 bg-inherit p-1 flex-1 focus:outline-none"
            />
        </li>
    );
}
