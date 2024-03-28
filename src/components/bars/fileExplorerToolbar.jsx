import {
    DocumentPlusIcon,
    EllipsisVerticalIcon,
    FolderPlusIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import {useContext, useEffect, useRef, useState} from "react";
import FileStructureContext from "../context/fileStructureProvider";
import NewElementContext from "../context/newElementProvider";

function fuzzySearchFilename(searchTerm, structure, prefix = "") {
    const regexPattern = searchTerm.split("").join(".*");
    const regex = new RegExp(regexPattern, "i");

    var searchResults = [];
    for (let element of structure) {
        const fullPath = prefix + element.name;

        if (element.type === "file") {
            const match = fullPath.match(regex);
            if (match) {
                // Calculate boldLetters array
                let searchTermPointer = 0;
                let boldLetters = [];
                for (
                    let i = 0;
                    i < fullPath.length &&
                    searchTermPointer < searchTerm.length;
                    i++
                ) {
                    if (
                        searchTerm[searchTermPointer].toLowerCase() ===
                        fullPath[i].toLowerCase()
                    ) {
                        boldLetters.push(i);
                        searchTermPointer++;
                    }
                }
                searchResults.push({
                    fullPath,
                    name: element.name,
                    boldLetters,
                });
            }
        } else {
            searchResults = searchResults.concat(
                fuzzySearchFilename(
                    searchTerm,
                    element.contents,
                    fullPath + "/"
                )
            );
        }
    }
    return searchResults;
}

function FileExplorerSearchbar() {
    const {fileStructure} = useContext(FileStructureContext);
    const {setCurrentFile} = useContext(NewElementContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef();

    useEffect(() => {
        if (searchTerm.length >= 1) {
            const currentSearchResults = fuzzySearchFilename(
                searchTerm,
                fileStructure
            );
            setSearchResults(currentSearchResults);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, fileStructure]);

    const clearSearchTerm = () => {
        setSearchTerm("");
        // Move focus back to the search input
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div className="relative p-1">
            <input
                className="w-full pl-2 p-1 bg-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                ref={searchInputRef}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            {searchTerm && (
                <button
                    onClick={clearSearchTerm}
                    className="absolute right-0 top-0 p-2 rounded-md hover:brightness-75"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            )}
            <ul className="absolute w-fit max-h-80 m-2 overflow-y-scroll flex flex-col bg-indigo-950 shadow-lg rounded-lg *:flex *:flex-col *:p-2">
                {searchResults.map((result, index) => {
                    return (
                        <li
                            key={index}
                            className="hover:bg-indigo-900 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                            onClick={() => setCurrentFile(result.fullPath)}
                        >
                            <p className="text-xs text-indigo-200">
                                {result.fullPath.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className={
                                            result.boldLetters.includes(i)
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {char}
                                    </span>
                                ))}
                            </p>
                            <p className="text-indigo-50">{result.name}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function FileExplorerToolbar() {
    const {
        showNewElementInput,
        setShowNewElementInput,
        fileOrFolder,
        setFileOrFolder,
    } = useContext(NewElementContext);
    const [showSearchbar, setShowSearchbar] = useState(false);

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    };

    const showNewInput = (event, newFileOrFolder) => {
        event.stopPropagation();
        if (!showNewElementInput) {
            setShowNewElementInput(true);
            setFileOrFolder(newFileOrFolder);
        } else {
            if (newFileOrFolder !== fileOrFolder) {
                setFileOrFolder(newFileOrFolder);
            } else {
                setShowNewElementInput(false);
            }
        }
    };

    return (
        <div className="top-0 w-full p-1 grid grid-cols-1 bg-slate-800 text-white">
            <div className="flex items-center">
                <div className="font-semibold flex-1 ml-3">Explorer</div>
                <div className="font-semibold flex items-center gap-1 *:p-1 *:rounded">
                    <button
                        onClick={toggleSearchbar}
                        className="hover:bg-gray-800"
                    >
                        <MagnifyingGlassIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => showNewInput(e, "file")}
                        className="hover:bg-gray-800"
                    >
                        <DocumentPlusIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => showNewInput(e, "dir")}
                        className="hover:bg-gray-800"
                    >
                        <FolderPlusIcon className="w-6 h-6" />
                    </button>
                    <button className="hover:bg-gray-800">
                        <EllipsisVerticalIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {showSearchbar && <FileExplorerSearchbar />}
        </div>
    );
}
