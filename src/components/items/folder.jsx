import FileStructureContext from "../context/fileStructureProvider";
import FolderIcon from "../icons/folder";
import OpenFolderIcon from "../icons/openFolder";
import FileItem from "./file";
import {useContext} from "react";

export default function FolderItem({item, parent, level}) {
    const {toggleFolder} = useContext(FileStructureContext);

    const folderPath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleToggleFolder = () => {
        toggleFolder(folderPath);
    };
    const styleColor = `var(--${item.name[0].toUpperCase()})`;

    return (
        <>
            <li
                id={folderPath}
                style={{
                    marginLeft: `${level * 16 + 4}px`,
                }}
                className="p-1 cursor-pointer rounded-lg hover:bg-slate-700"
                draggable
                onClick={handleToggleFolder}
            >
                <span className="w-fit flex items-center">
                    {item.open ? (
                        <OpenFolderIcon color={styleColor} />
                    ) : (
                        <FolderIcon color={styleColor} />
                    )}
                    {item.name}
                </span>
            </li>
            {item.open &&
                item.contents.map((child_item) => {
                    if (child_item.type === "file") {
                        return (
                            <FileItem
                                key={child_item.name}
                                item={child_item}
                                parent={folderPath}
                                level={level + 1}
                            />
                        );
                    } else {
                        return (
                            <FolderItem
                                key={child_item.name}
                                item={child_item}
                                parent={folderPath}
                                level={level + 1}
                            />
                        );
                    }
                })}
        </>
    );
}
