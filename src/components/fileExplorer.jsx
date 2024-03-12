import {useContext, useRef, useState, useEffect} from "react";
import FileStructureContext from "./context/fileStructureProvider";

import FileItem from "./items/file";
import FolderItem from "./items/folder";
import GutterRenderer from "./gutters";
import Highlighter from "./highlighter";
import FileExplorerToolbar from "./fileExplorerToolbar";
import NewFileItem from "./items/newfile";
import NewFolderItem from "./items/newfolder";
import CurrentFileContext from "./context/currentFileProvider";

export default function FileExplorer() {
    const {fileStructure} = useContext(FileStructureContext);
    const {currentFile} = useContext(CurrentFileContext);
    const [cursorY, setCursorY] = useState(0);
    const fileStructureRef = useRef(null);
    const slashCount = currentFile.split("/").length - 1;

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
        <div className="w-screen h-screen bg-slate-900 text-gray-50">
            <div className="absolute top-0 left-0 h-screen bg-gray-800 overflow-y-scroll">
                <FileExplorerToolbar />
                <ul
                    id="file-explorer"
                    ref={fileStructureRef}
                    className="relative w-96 p-1 flex flex-col"
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
                    {slashCount == 0 && (
                        <>
                            <NewFileItem />
                            <NewFolderItem />
                        </>
                    )}
                    <GutterRenderer />
                    <Highlighter y={cursorY} />
                </ul>
            </div>
        </div>
    );
}
