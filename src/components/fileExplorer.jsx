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
    // const [elementId, setElementId] = useState(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const rect = fileStructureRef.current.getBoundingClientRect();
            const offsetY =
                event.clientY + fileStructureRef.current.scrollTop - rect.top;
            setY(Math.round((offsetY - 16) / 32));

            // const elementUnderCursor = document.elementFromPoint(
            //     event.clientX,
            //     event.clientY
            // );

            // // Traverse up the DOM tree until we find an <li> element or reach the top
            // let liElement = null;
            // let currentElement = elementUnderCursor;
            // while (
            //     currentElement &&
            //     currentElement !== fileStructureRef.current
            // ) {
            //     if (currentElement.tagName === "LI") {
            //         liElement = currentElement;
            //         break;
            //     }
            //     currentElement = currentElement.parentElement;
            // }

            // // Get the id of the <li> element under the cursor
            // const elementId = liElement ? liElement.id : ".";
            // console.log("Element under cursor:", elementId);
            // setElementId(elementId);
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
            <Highlighter y={y} />
        </ul>
    );
}
