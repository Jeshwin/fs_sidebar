function calculateHighlighterPositions(fileStructure) {
    const highlighterPositions = [];

    const calculateFolderPosition = (folder, level) => {
        const position = {
            top: 0,
            height: 0,
            level: level,
        };

        let calcTop = 0;
        const calculateTop = (structure, currentLevel) => {
            structure.forEach((item) => {
                calcTop += 32; // Height of each file or folder
                if (item.type === "dir" && item.open) {
                    if (item.name === folder.name && currentLevel === level) {
                        position.top = calcTop;
                        return;
                    }
                    calculateTop(item.contents, currentLevel + 1);
                }
            });
        };
        calculateTop(fileStructure, 0);
        position.top -= 32;

        let calcHeight = 0;
        const calculateHeight = (structure, currentLevel) => {
            structure.forEach((item) => {
                calcHeight += 32;
                if (item.type === "dir" && item.open) {
                    calculateHeight(item.contents, currentLevel + 1);
                }
            });
        };
        calculateHeight(folder.contents, level + 1);
        position.height = calcHeight + 32;

        return position;
    };

    const traverseFileStructure = (structure, level) => {
        structure.forEach((item) => {
            if (item.type === "dir" && item.open) {
                const folderPosition = calculateFolderPosition(item, level);
                highlighterPositions.push({...folderPosition, level});
                traverseFileStructure(item.contents, level + 1);
            }
        });
    };

    traverseFileStructure(fileStructure, 0);
    return highlighterPositions;
}

// Example usage:
const fileStructure = [
    {
        type: "dir",
        name: "components",
        open: false,
        contents: [
            {
                type: "dir",
                name: "icons",
                open: false,
                contents: [
                    {
                        type: "file",
                        name: "file.jsx",
                    },
                    {
                        type: "file",
                        name: "folder.jsx",
                    },
                    {
                        type: "file",
                        name: "openFolder.jsx",
                    },
                ],
            },
            {
                type: "dir",
                name: "items",
                open: false,
                contents: [
                    {
                        type: "file",
                        name: "file.jsx",
                    },
                    {
                        type: "file",
                        name: "folder.jsx",
                    },
                    {
                        type: "file",
                        name: "folderProvider.jsx",
                    },
                ],
            },
        ],
    },
    {
        type: "dir",
        name: "utils",
        open: false,
        contents: [
            {
                type: "file",
                name: "example.json",
            },
            {
                type: "file",
                name: "example.txt",
            },
            {
                type: "file",
                name: "parseDirectory.js",
            },
        ],
    },
    {
        type: "file",
        name: "App.jsx",
    },
    {
        type: "file",
        name: "example.json",
    },
    {
        type: "file",
        name: "globals.css",
    },
    {
        type: "file",
        name: "main.jsx",
    },
];

const highlighterPositions = calculateHighlighterPositions(fileStructure);
console.log(highlighterPositions);
