import {createContext, useState} from "react";

const NewElementContext = createContext();

// Create fileStructure provider
export const NewElementProvider = ({children}) => {
    // Currently selected file
    const [currentFile, setCurrentFile] = useState("");
    // Toggle input for new item
    const [showNewElementInput, setShowNewElementInput] = useState(false);
    // Is the new item a file or a folder?
    const [fileOrFolder, setFileOrFolder] = useState("file");

    return (
        <NewElementContext.Provider
            value={{
                currentFile,
                setCurrentFile,
                showNewElementInput,
                setShowNewElementInput,
                fileOrFolder,
                setFileOrFolder,
            }}
        >
            {children}
        </NewElementContext.Provider>
    );
};

export default NewElementContext;
