import {readFile, writeFile} from "fs";

function parseFileStructure(input) {
    const lines = input.split("\n");
    const result = [];
    let workingDirectory = result;

    lines
        .filter((line) => line != "" && line != "./" && line != "../")
        .forEach((line) => {
            // Case 1: Line is a folder
            if (line.charAt(line.length - 1) == "/") {
                workingDirectory.push({
                    type: "folder",
                    name: line.slice(0, -1),
                    contents: [],
                });
            }
            // Case 2: Line is header for contents of a folder
            else if (line.slice(0, 2) == "./") {
                let newDirectory = result;
                line.slice(2, -1)
                    .split("/")
                    .forEach((directory) => {
                        for (let item of newDirectory) {
                            if (
                                item.type == "folder" &&
                                item.name == directory
                            ) {
                                newDirectory = item.contents;
                                break;
                            }
                        }
                    });
                workingDirectory = newDirectory;
            }
            // Case 3: Line is a file
            else {
                workingDirectory.push({
                    type: "file",
                    name: line,
                });
            }

            // Sort contents after adding them
            if (workingDirectory === result) {
                // Sort the result array
                result.sort((a, b) => {
                    if (a.type === "folder" && b.type === "file") return -1;
                    if (a.type === "file" && b.type === "folder") return 1;
                    return a.name.localeCompare(b.name);
                });
            } else {
                // Sort the contents of the folder
                workingDirectory.sort((a, b) => {
                    if (a.type === "folder" && b.type === "file") return -1;
                    if (a.type === "file" && b.type === "folder") return 1;
                    return a.name.localeCompare(b.name);
                });
            }
        });

    return result;
}

readFile("example.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const fileStructure = parseFileStructure(data);
    const jsonFileData = JSON.stringify(fileStructure, null, 4);

    // Write JSON data to a file
    writeFile("example.json", jsonFileData, (err) => {
        if (err) {
            console.error("Error writing JSON file:", err);
            return;
        }
        console.log("File structure saved to example.json");
    });
});
