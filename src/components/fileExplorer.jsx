import {useContext, useRef, useState, useEffect} from "react";
import FileStructureContext from "./context/fileStructureProvider";
import FileItem from "./items/file";
import FolderItem from "./items/folder";
import GutterRenderer from "./gutters";
import Highlighter from "./highlighter";
import FileExplorerToolbar from "./bars/fileExplorerToolbar";
import NewItem from "./items/newelement";
import NewElementContext from "./context/newElementProvider";
import SidebarControllerContext from "./context/sidebarControllerProvider";

export default function FileExplorer() {
    const {fileStructure} = useContext(FileStructureContext);
    const {currentFile} = useContext(NewElementContext);
    const {showSidebar} = useContext(SidebarControllerContext);
    const [cursorY, setCursorY] = useState(0);
    // Take into account scroll position when getting cursor vertical position
    const fileStructureRef = useRef(null);
    // Number of parent folders for selected file
    // Used to determine whether to render new item form here
    const slashCount = currentFile.split("/").length - 1;

    // Render highlighter based on cursor's vertical position
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

    if (!showSidebar) return;

    return (
        <div className="w-fit h-full bg-slate-800 text-gray-50 overflow-y-scroll">
            {/** Toolbar contains searchbar and buttons to add new file or folder */}
            <FileExplorerToolbar />
            {/** The actual file and folder elements */}
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
                {/** If selected file is in root directory, render form to add new file/folder */}
                {slashCount == 0 && <NewItem />}
                {/** Render lines from open folders, also act as collapse buttons */}
                <GutterRenderer />
                {/** Render highlighter based on cursor's vertical position */}
                <Highlighter y={cursorY} />
            </ul>
        </div>
    );
}
