import {createContext, useState} from "react";
import fileStructureData from "./example.json";

const FileStructureContext = createContext();

// Create fileStructure provider
export const FileStructureProvider = ({children}) => {
    const [fileStructure, setFileStructure] = useState(fileStructureData);

    // Function to toggle the "open" attribute of a folder
    const toggleFolder = (folderName) => {
        // Split folderName into individual folder names
        const folders = folderName.split("/");

        // Recursive function to find and toggle the folder
        const findAndToggleFolder = (folders, currentStructure) => {
            const folderName = folders[0];

            // Find the folder in the current structure
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folderName && item.type === "dir"
            );

            // Do nothing if folder doesn't exist
            if (folderIndex === -1) {
                return;
            }

            // Toggle the "open" attribute if we reached the last folder
            if (folders.length === 1) {
                currentStructure[folderIndex].open =
                    !currentStructure[folderIndex].open;
            }

            // If there are subfolders and the folder is open, continue searching
            if (currentStructure[folderIndex].open && folders.length > 1) {
                findAndToggleFolder(
                    folders.slice(1),
                    currentStructure[folderIndex].contents
                );
            }

            // Update the state with the modified structure
            setFileStructure([...fileStructure]);
        };

        findAndToggleFolder(folders, fileStructure);
    };

    // Function to add a new file at the specified path
    const addFile = (path, newFile) => {
        const folders = path.split("/");
        let currentStructure = fileStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folder && item.type === "dir"
            );
            if (folderIndex === -1) {
                // Path does not exist, cannot add file
                return;
            }
            currentStructure = currentStructure[folderIndex].contents;
        }

        // Add the new file to the current structure
        currentStructure.push({
            type: "file",
            name: newFile.name,
        });

        // Update the state with the modified structure
        setFileStructure([...fileStructure]);
    };

    // Function to add a new folder at the specified path
    const addFolder = (path, newFolder) => {
        const folders = path.split("/");
        let currentStructure = fileStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folder && item.type === "dir"
            );
            if (folderIndex === -1) {
                // Path does not exist, cannot add folder
                return;
            }
            currentStructure = currentStructure[folderIndex].contents;
        }

        // Add the new folder to the current structure
        currentStructure.push({
            type: "dir",
            name: newFolder.name,
            contents: [],
            open: false, // default to closed
        });

        // Update the state with the modified structure
        setFileStructure([...fileStructure]);
    };

    return (
        <FileStructureContext.Provider
            value={{fileStructure, toggleFolder, addFile, addFolder}}
        >
            {children}
        </FileStructureContext.Provider>
    );
};

export default FileStructureContext;
