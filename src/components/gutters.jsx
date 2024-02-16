import {useContext, useEffect, useState} from "react";
import OpenFolderContext from "./context/openFolderProvider";
import FileStructureContext from "./context/fileStructureProvider";

export default function GutterRenderer() {
    const {fileStructure} = useContext(FileStructureContext);
    const {openFolders, toggleFolder} = useContext(OpenFolderContext);
    const [gutterMarks, setGutterMarks] = useState([]);

    const addGutter = (newGutter) => {
        setGutterMarks((oldGutterMarks) => [...oldGutterMarks, newGutter]);
    };

    useEffect(() => {
        const renderGutterMarks = () => {
            const calculateGutterPosition = (
                folderName,
                level,
                folderContents
            ) => {
                let position = {
                    top: 0,
                    height: 0,
                };

                let calcTop = 0;
                const calculateTop = (structure, currentLevel) => {
                    structure.forEach((item) => {
                        calcTop += 32; // Height of each file or folder
                        if (
                            item.type === "dir" &&
                            openFolders[`${item.name}-${currentLevel}`]
                        ) {
                            if (
                                item.name === folderName &&
                                currentLevel === level
                            ) {
                                position.top = calcTop;
                                return;
                            }
                            calculateTop(item.contents, currentLevel + 1);
                        }
                    });
                };
                calculateTop(fileStructure, 0);
                position.top += 4;

                let calcHeight = 0;
                const calculateHeight = (structure, currentLevel) => {
                    structure.forEach((item) => {
                        calcHeight += 32;
                        if (
                            item.type === "dir" &&
                            openFolders[`${item.name}-${currentLevel}`]
                        ) {
                            calculateHeight(item.contents, currentLevel + 1);
                        }
                    });
                };
                calculateHeight(folderContents, level + 1);
                position.height = calcHeight;
                return position;
            };

            const traverseStructure = (structure, parentLevel) => {
                structure.forEach((item) => {
                    if (
                        item.type === "dir" &&
                        openFolders[`${item.name}-${parentLevel}`]
                    ) {
                        const gutterPosition = calculateGutterPosition(
                            item.name,
                            parentLevel,
                            item.contents
                        );

                        addGutter(
                            <button
                                key={`gutter-${item.name}-${parentLevel}`}
                                className="absolute w-5 rounded cursor-pointer group flex flex-row-reverse"
                                style={{
                                    top: `${gutterPosition.top}px`,
                                    left: `${parentLevel * 16}px`,
                                    height: `${gutterPosition.height}px`,
                                }}
                                onClick={() =>
                                    toggleFolder(item.name, parentLevel)
                                }
                            >
                                <div className="group-hover:bg-orange-500 w-px mr-1 rounded h-full bg-black"></div>
                            </button>
                        );

                        traverseStructure(item.contents, parentLevel + 1);
                    }
                });
            };

            setGutterMarks([]);
            traverseStructure(fileStructure, 0, 0);
        };

        renderGutterMarks();
    }, [fileStructure, openFolders, toggleFolder]);

    return <>{gutterMarks}</>;
}
