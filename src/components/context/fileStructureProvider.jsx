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

        // Edge case: path is empty => root directory
        if (!path) {
            // Check if the file already exists in the current structure
            const fileExists = currentStructure.some(
                (item) => item.type === "file" && item.name === newFile.name
            );

            if (fileExists) {
                console.log(
                    `File "${newFile.name}" already exists in the destination folder.`
                );
                // You can show a modal or perform other actions here
                return false;
            }
            // Add the new file to the current structure
            currentStructure.push({
                type: "file",
                name: newFile.name,
            });
            currentStructure.sort((a, b) => {
                if (a.type === "dir" && b.type === "file") return -1;
                if (a.type === "file" && b.type === "dir") return 1;
                return a.name.localeCompare(b.name);
            });

            // Update the state with the modified structure
            setFileStructure([...fileStructure]);
            return true;
        }

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folder && item.type === "dir"
            );
            if (folderIndex === -1) {
                // Path does not exist, cannot add file
                return false;
            }
            currentStructure = currentStructure[folderIndex].contents;
        }

        // Check if the file already exists in the current structure
        const fileExists = currentStructure.some(
            (item) => item.type === "file" && item.name === newFile.name
        );

        if (fileExists) {
            console.log(
                `File "${newFile.name}" already exists in the destination folder.`
            );
            // You can show a modal or perform other actions here
            return false;
        }

        // Add the new file to the current structure
        currentStructure.push({
            type: "file",
            name: newFile.name,
        });
        currentStructure.sort((a, b) => {
            if (a.type === "dir" && b.type === "file") return -1;
            if (a.type === "file" && b.type === "dir") return 1;
            return a.name.localeCompare(b.name);
        });

        // Update the state with the modified structure
        setFileStructure([...fileStructure]);
        return true;
    };

    // Function to add a new folder at the specified path
    const addFolder = (path, newFolder) => {
        const folders = path.split("/");
        let currentStructure = fileStructure;

        // Edge case: path is empty => root directory
        if (!path) {
            // Check if the folder already exists in the current structure
            const folderExists = currentStructure.some(
                (item) => item.type === "dir" && item.name === newFolder.name
            );

            if (folderExists) {
                console.log(
                    `Folder "${newFolder.name}" already exists in the destination folder.`
                );
                // You can show a modal or perform other actions here
                return false;
            }
            // Add the new folder to the current structure
            currentStructure.push({
                type: "dir",
                name: newFolder.name,
                contents: newFolder.contents,
                open: newFolder.open, // default to closed
            });
            currentStructure.sort((a, b) => {
                if (a.type === "dir" && b.type === "file") return -1;
                if (a.type === "file" && b.type === "dir") return 1;
                return a.name.localeCompare(b.name);
            });

            // Update the state with the modified structure
            setFileStructure([...fileStructure]);
            return true;
        }

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folder && item.type === "dir"
            );
            if (folderIndex === -1) {
                // Path does not exist, cannot add folder
                return false;
            }
            currentStructure = currentStructure[folderIndex].contents;
        }

        // Check if the folder already exists in the current structure
        const folderExists = currentStructure.some(
            (item) => item.type === "dir" && item.name === newFolder.name
        );

        if (folderExists) {
            console.log(
                `Folder "${newFolder.name}" already exists in the destination folder.`
            );
            // You can show a modal or perform other actions here
            return false;
        }

        // Add the new folder to the current structure
        currentStructure.push({
            type: "dir",
            name: newFolder.name,
            contents: newFolder.contents,
            open: newFolder.open, // default to closed
        });
        currentStructure.sort((a, b) => {
            if (a.type === "dir" && b.type === "file") return -1;
            if (a.type === "file" && b.type === "dir") return 1;
            return a.name.localeCompare(b.name);
        });

        // Update the state with the modified structure
        setFileStructure([...fileStructure]);
        return true;
    };

    // Function to delete a file at the specified path
    const deleteFile = (path) => {
        const folders = path.split("/");
        const fileName = folders.pop(); // Get the file name
        let currentStructure = fileStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folder && item.type === "dir"
            );
            if (folderIndex === -1) {
                // Path does not exist, file cannot be deleted
                return;
            }
            currentStructure = currentStructure[folderIndex].contents;
        }

        // Find the index of the file to be deleted
        const fileIndex = currentStructure.findIndex(
            (item) => item.name === fileName && item.type === "file"
        );

        if (fileIndex === -1) {
            // File not found at the specified path
            return;
        }

        // Remove the file from the current structure
        currentStructure.splice(fileIndex, 1);

        // Update the state with the modified structure
        setFileStructure([...fileStructure]);
    };

    // Function to delete a folder at the specified path
    const deleteFolder = (path) => {
        const folders = path.split("/");
        const folderName = folders.pop(); // Get the folder name
        let currentStructure = fileStructure;

        // Traverse the file structure to the specified path
        for (const folder of folders) {
            const folderIndex = currentStructure.findIndex(
                (item) => item.name === folder && item.type === "dir"
            );
            if (folderIndex === -1) {
                // Path does not exist, folder cannot be deleted
                return;
            }
            currentStructure = currentStructure[folderIndex].contents;
        }

        // Find the index of the folder to be deleted
        const folderIndex = currentStructure.findIndex(
            (item) => item.name === folderName && item.type === "dir"
        );

        if (folderIndex === -1) {
            // Folder not found at the specified path
            return;
        }

        // Remove the folder from the current structure
        currentStructure.splice(folderIndex, 1);

        // Update the state with the modified structure
        setFileStructure([...fileStructure]);
    };

    return (
        <FileStructureContext.Provider
            value={{
                fileStructure,
                toggleFolder,
                addFile,
                deleteFile,
                addFolder,
                deleteFolder,
            }}
        >
            {children}
        </FileStructureContext.Provider>
    );
};

export default FileStructureContext;
