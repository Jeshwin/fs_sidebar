import {createContext, useState} from "react";

const OpenFolderContext = createContext();

export const OpenFolderProvider = ({children}) => {
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (folderName, level) => {
        setOpenFolders((prevOpenFolders) => ({
            ...prevOpenFolders,
            [`${folderName}-${level}`]:
                !prevOpenFolders[`${folderName}-${level}`],
        }));
    };

    return (
        <OpenFolderContext.Provider value={{openFolders, toggleFolder}}>
            {children}
        </OpenFolderContext.Provider>
    );
};

export default OpenFolderContext;
