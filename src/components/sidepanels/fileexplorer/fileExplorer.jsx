import {useContext, useEffect, useRef, useState} from "react";
import FileExplorerToolbar from "./fileExplorerToolbar";
import FileStructureContext from "../../context/fileStructureProvider";
import NewElementContext from "../../context/newElementProvider";
import FileItem from "./elements/file";
import FolderItem from "./elements/folder";
import NewItem from "./elements/newelement";
import GutterRenderer from "./gutters";
import Highlighter from "./highlighter";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function FileExplorer() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
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
        <div
            className={`${
                sidePanelSelection !== "file-explorer" ? "hidden" : ""
            } h-full bg-slate-100 dark:bg-slate-800 dark:text-white overflow-scroll`}
        >
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
