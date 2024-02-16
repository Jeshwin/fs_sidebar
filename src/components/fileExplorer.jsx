import {useState, useContext, useRef, useEffect} from "react";
import FileStructureContext from "./context/fileStructureProvider";

import FileItem from "./items/file";
import FolderItem from "./items/folder";
import GutterRenderer from "./gutters";
import Highlighter from "./highlighter";

export default function FileExplorer() {
    const {fileStructure} = useContext(FileStructureContext);
    const fileStructureRef = useRef(null);
    const [y, setY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const rect = fileStructureRef.current.getBoundingClientRect();
            const offsetY = event.clientY - rect.top;
            setY(Math.round((offsetY - 16) / 32));
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
        <ul
            ref={fileStructureRef}
            className="relative w-96 h-[640px] overflow-scroll border border-black rounded-lg p-1 flex flex-col"
        >
            {fileStructure.map((item) => {
                if (item.type === "file") {
                    return (
                        <FileItem
                            key={item.name}
                            name={item.name}
                            parent={"."}
                            level={0}
                        />
                    );
                } else {
                    return (
                        <FolderItem
                            key={item.name}
                            name={item.name}
                            parent={"."}
                            level={0}
                            contents={item.contents}
                        />
                    );
                }
            })}
            <GutterRenderer />
            <Highlighter y={y} />
        </ul>
    );
}
