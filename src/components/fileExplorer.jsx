import {useContext, useRef} from "react";
import FileStructureContext from "./context/fileStructureProvider";

import FileItem from "./items/file";
import FolderItem from "./items/folder";
import GutterRenderer from "./gutters";

export default function FileExplorer() {
    const {fileStructure} = useContext(FileStructureContext);
    const fileStructureRef = useRef(null);

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
        </ul>
    );
}
