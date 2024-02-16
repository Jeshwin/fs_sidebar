import FolderIcon from "../icons/folder";
import OpenFolderIcon from "../icons/openFolder";
import FileItem from "./file";
import OpenFolderContext from "../context/openFolderProvider";
import {useContext} from "react";

export default function FolderItem({name, parent, level, contents}) {
    const {openFolders, toggleFolder} = useContext(OpenFolderContext);

    const isOpen = openFolders[`${name}-${level}`];

    const handleToggleFolder = () => {
        toggleFolder(name, level);
    };
    const styleColor = `var(--${name[0].toUpperCase()})`;

    return (
        <>
            <li
                style={{
                    marginLeft: `${level * 16 + 4}px`,
                }}
                className="p-1 cursor-pointer rounded"
                draggable
                onClick={handleToggleFolder}
            >
                <span className="w-fit flex items-center">
                    {isOpen ? (
                        <OpenFolderIcon color={styleColor} />
                    ) : (
                        <FolderIcon color={styleColor} />
                    )}
                    <span className="ml-1 select-none">{`${parent}/${name}`}</span>
                </span>
            </li>
            {isOpen &&
                contents.map((item) => {
                    if (item.type === "file") {
                        return (
                            <FileItem
                                key={item.name}
                                name={item.name}
                                parent={`${parent}/${name}`}
                                level={level + 1}
                            />
                        );
                    } else {
                        return (
                            <FolderItem
                                key={item.name}
                                name={item.name}
                                parent={`${parent}/${name}`}
                                level={level + 1}
                                contents={item.contents}
                            />
                        );
                    }
                })}
        </>
    );
}
