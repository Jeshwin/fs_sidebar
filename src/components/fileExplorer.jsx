import {useContext, useRef, useState, useEffect} from "react";
import FileStructureContext from "./context/fileStructureProvider";

import FileItem from "./items/file";
import FolderItem from "./items/folder";
import GutterRenderer from "./gutters";
import Highlighter from "./highlighter";

export default function FileExplorer() {
    const {fileStructure} = useContext(FileStructureContext);
    const fileStructureRef = useRef(null);
    const [cursorY, setCursorY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const containerRect =
                fileStructureRef.current.getBoundingClientRect();
            const offsetY =
                event.clientY -
                containerRect.top +
                fileStructureRef.current.scrollTop;
            setCursorY(offsetY);
        };

        const fileStructureContainer = fileStructureRef.current;

        if (fileStructureContainer) {
            fileStructureContainer.addEventListener(
                "mousemove",
                handleMouseMove
            );
        }

        return () => {
            if (fileStructureContainer) {
                fileStructureContainer.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );
            }
        };
    }, []);

    return (
        <div className="container mx-auto bg-gray-800 text-gray-50 h-screen grid justify-center place-content-center">
            <ul
                ref={fileStructureRef}
                className="relative w-96 h-96 overflow-scroll border border-gray-500 rounded-lg p-1 flex flex-col"
            >
                {fileStructure.map((item) => {
                    if (item.type === "file") {
                        return (
                            <FileItem
                                key={item.name}
                                item={item}
                                parent={""}
                                level={0}
                            />
                        );
                    } else {
                        return (
                            <FolderItem
                                key={item.name}
                                item={item}
                                parent={""}
                                level={0}
                            />
                        );
                    }
                })}
                <GutterRenderer />
                <Highlighter y={cursorY} />
            </ul>
        </div>
    );
}
