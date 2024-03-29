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

function FileExplorer() {
    const {fileStructure} = useContext(FileStructureContext);
    const {currentFile} = useContext(NewElementContext);
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

    return (
        <div className="h-full bg-slate-100 dark:bg-slate-800 dark:text-white overflow-scroll">
            {/** Toolbar contains searchbar and buttons to add new file or folder */}
            <FileExplorerToolbar />
            {/** The actual file and folder elements */}
            <ul
                id="file-explorer"
                ref={fileStructureRef}
                className="relative p-1 flex flex-col"
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

export default function IDE() {
    const {showSidebar} = useContext(SidebarControllerContext);
    const handlebarRef = useRef(null); // Ref for the handlebar
    const [isDragging, setIsDragging] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(384);
    const minSidebarWidth = 240;
    const maxSidebarWidth = 600;

    // Start dragging
    const startDragging = (e) => {
        e.preventDefault(); // Prevent text selection during drag
        setIsDragging(true);
    };

    useEffect(() => {
        const handleDragging = (e) => {
            if (isDragging) {
                // Adjust width based on handlebar position
                setSidebarWidth(
                    Math.min(
                        Math.max(e.clientX, minSidebarWidth),
                        maxSidebarWidth
                    )
                );
            }
        };

        // Stop dragging
        const stopDragging = () => setIsDragging(false);

        document.addEventListener("mousemove", handleDragging);
        document.addEventListener("mouseup", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleDragging);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging]);

    return (
        <div className="w-full h-full flex">
            <div
                style={{
                    width: `${showSidebar ? sidebarWidth : 0}px`,
                    maxWidth: `${maxSidebarWidth}px`,
                }}
            >
                <FileExplorer />
            </div>
            <div
                ref={handlebarRef}
                onMouseDown={startDragging}
                className="h-full w-2 grid place-content-center select-none cursor-col-resize"
            >
                <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
            </div>
            <div className="flex-1">
                <div className="w-full h-full pr-1 pb-1 flex">
                    <div className="h-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                        <div className="w-full h-full grid place-content-center">
                            <p className="text-9xl font-bold text-center">0</p>
                        </div>
                    </div>
                    <div className="h-full w-2 rounded-full grid place-content-center select-none cursor-col-resize">
                        <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
                    </div>
                    <div className="h-full flex-1 flex flex-col">
                        <div className="w-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                            <div className="w-full h-full grid place-content-center">
                                <p className="text-9xl font-bold text-center">
                                    1
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-2 rounded-full grid place-content-center select-none cursor-row-resize">
                            <div className="w-6 h-0.5 my-1 rounded-full bg-slate-950 dark:bg-white"></div>
                        </div>
                        <div className="w-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                            <div className="w-full h-full grid place-content-center">
                                <p className="text-9xl font-bold text-center">
                                    2
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
