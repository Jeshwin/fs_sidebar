import {createContext, useState} from "react";
import fileStructureData from "./example.json";

const FileStructureContext = createContext();

export const FileStructureProvider = ({children}) => {
    const [fileStructure, setFileStructure] = useState(fileStructureData);

    return (
        <FileStructureContext.Provider
            value={{fileStructure, setFileStructure}}
        >
            {children}
        </FileStructureContext.Provider>
    );
};

export default FileStructureContext;
