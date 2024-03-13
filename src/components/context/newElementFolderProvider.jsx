import {createContext, useContext, useEffect, useState} from "react";
import CurrentFileContext from "./currentFileProvider";

const NewElementFolderContext = createContext();

// Create fileStructure provider
export const NewElementFolderProvider = ({children}) => {
    const [newElementFolder, setNewElementFolder] = useState("");
    const [showNewElementInput, setShowNewElementInput] = useState(false);
    const [fileOrFolder, setFileOrFolder] = useState("file");
    const {currentFile} = useContext(CurrentFileContext);

    useEffect(() => {
        if (newElementFolder === "") {
            setNewElementFolder(
                currentFile.split("/").length == 1
                    ? ""
                    : currentFile.split("/").slice(0, -1).join("/")
            );
        }
    }, [newElementFolder, currentFile]);

    return (
        <NewElementFolderContext.Provider
            value={{
                newElementFolder,
                setNewElementFolder,
                showNewElementInput,
                setShowNewElementInput,
                fileOrFolder,
                setFileOrFolder,
            }}
        >
            {children}
        </NewElementFolderContext.Provider>
    );
};

export default NewElementFolderContext;
