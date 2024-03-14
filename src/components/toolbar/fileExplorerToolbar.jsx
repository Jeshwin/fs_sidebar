import {
    DocumentPlusIcon,
    EllipsisVerticalIcon,
    FolderPlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {useContext, useState} from "react";
import FileExplorerSearchbar from "./fileExplorerSearchbar";
import NewElementFolderContext from "../context/newElementFolderProvider";

export default function FileExplorerToolbar() {
    const {
        showNewElementInput,
        setShowNewElementInput,
        fileOrFolder,
        setFileOrFolder,
    } = useContext(NewElementFolderContext);
    const [showSearchbar, setShowSearchbar] = useState(false);

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    };

    const showNewInput = (event, newFileOrFolder) => {
        event.stopPropagation();
        if (!showNewElementInput) {
            setShowNewElementInput(true);
            setFileOrFolder(newFileOrFolder);
        } else {
            if (newFileOrFolder !== fileOrFolder) {
                setFileOrFolder(newFileOrFolder);
            } else {
                setShowNewElementInput(false);
            }
        }
    };

    return (
        <div className="sticky z-10 top-0 w-full p-1 grid grid-cols-1 bg-gray-950 text-white">
            <div className="flex items-center">
                <div className="font-semibold flex-1 ml-3">Explorer</div>
                <div className="font-semibold flex items-center gap-1 *:p-1 *:rounded">
                    <button
                        onClick={toggleSearchbar}
                        className="hover:bg-gray-800"
                    >
                        <MagnifyingGlassIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => showNewInput(e, "file")}
                        className="hover:bg-gray-800"
                    >
                        <DocumentPlusIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => showNewInput(e, "dir")}
                        className="hover:bg-gray-800"
                    >
                        <FolderPlusIcon className="w-6 h-6" />
                    </button>
                    <button className="hover:bg-gray-800">
                        <EllipsisVerticalIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {showSearchbar && <FileExplorerSearchbar />}
        </div>
    );
}
