import {createContext, useState} from "react";

const CurrentFileContext = createContext();

// Create fileStructure provider
export const CurrentFileProvider = ({children}) => {
    const [currentFile, setCurrentFile] = useState("");

    return (
        <CurrentFileContext.Provider
            value={{
                currentFile,
                setCurrentFile,
            }}
        >
            {children}
        </CurrentFileContext.Provider>
    );
};

export default CurrentFileContext;
