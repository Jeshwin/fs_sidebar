import {useContext, useEffect, useRef, useState} from "react";
import FileStructureContext from "../context/fileStructureProvider";
import {XMarkIcon} from "@heroicons/react/24/outline";
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
                console.dir(match);
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
                console.dir({
                    fullPath,
                    name: element.name,
                    boldLetters,
                });
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

export default function FileExplorerSearchbar() {
    const {fileStructure} = useContext(FileStructureContext);
    const {setCurrentFile} = useContext(NewElementContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef();

    useEffect(() => {
        if (searchTerm.length >= 1) {
            console.log("Searching for", searchTerm);
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
        <div className="relative">
            <input
                ref={searchInputRef}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative w-[calc(100%-16px)] m-2 pl-2 p-1 bg-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            ></input>
            {searchTerm && (
                <button
                    onClick={clearSearchTerm}
                    className="absolute right-2 top-2 p-1 rounded-md hover:brightness-75"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            )}
            {searchResults && (
                <ul className="absolute ml-2 w-[calc(100%-16px)] max-h-80 overflow-y-scroll flex flex-col mt-2 bg-indigo-950 shadow-lg rounded-lg *:flex *:flex-col *:p-2">
                    {searchResults.map((result, index) => {
                        return (
                            <li
                                key={index}
                                className="hover:bg-indigo-900 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                                onClick={() => setCurrentFile(result.fullPath)}
                            >
                                <p className="text-xs text-indigo-200">
                                    {result.fullPath
                                        .split("")
                                        .map((char, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    result.boldLetters.includes(
                                                        i
                                                    )
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
            )}
        </div>
    );
}
