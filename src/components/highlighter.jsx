import {useContext, useEffect, useState} from "react";
import FileStructureContext from "./context/fileStructureProvider";

export default function Highlighter({y}) {
    const {fileStructure} = useContext(FileStructureContext);
    const [highlighterPosition, setHighlighterPosition] = useState(null);

    useEffect(() => {
        const positions = [];

        const traverse = (structure, parentName, parentTop, parentLevel) => {
            let top = parentTop;
            structure.forEach((item) => {
                if (item.type === "dir") {
                    const folderName = item.name;
                    const fullName = parentName
                        ? `${parentName}/${folderName}`
                        : folderName;
                    const left = parentLevel * 16 + 4;
                    let height = 32; // height of folder
                    if (item.open) {
                        height += traverse(
                            item.contents,
                            fullName,
                            top + 32,
                            parentLevel + 1
                        );
                    }
                    positions.push({top, left, height, fullName});
                    top += height;
                } else {
                    top += 32;
                }
            });
            return top - parentTop;
        };

        const totalHeight = traverse(fileStructure, "", 4, 0); // Start from top position 4 (accounting for padding)
        positions.push({
            top: 0,
            left: 0,
            height: totalHeight + 8,
            fullName: "",
        });

        // Find the most specific position that encapsulates the cursor's y coordinate
        let mostSpecificPosition = null;
        positions.forEach((position) => {
            if (
                y >= position.top &&
                y <= position.top + position.height &&
                (!mostSpecificPosition ||
                    position.fullName.length >
                        mostSpecificPosition.fullName.length)
            ) {
                mostSpecificPosition = position;
            }
        });

        setHighlighterPosition(mostSpecificPosition);
    }, [fileStructure, y]);

    return (
        <>
            {highlighterPosition && (
                <div
                    style={{
                        position: "absolute",
                        padding: "8px",
                        borderRadius: "8px",
                        top: `${highlighterPosition.top}px`,
                        left: `${highlighterPosition.left}px`,
                        height: `${highlighterPosition.height}px`,
                        width: `calc(100% - ${highlighterPosition.left}px)`,
                        pointerEvents: "none",
                    }}
                    className="border border-orange-500 transition-all duration-150"
                ></div>
            )}
        </>
    );
}
