import {
    DocumentPlusIcon,
    EllipsisVerticalIcon,
    FolderPlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {useState} from "react";
import FileExplorerSearchbar from "./fileExplorerSearchbar";

export default function FileExplorerToolbar() {
    const [showSearchbar, setShowSearchbar] = useState(false);

    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
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
                    <button className="hover:bg-gray-800">
                        <DocumentPlusIcon className="w-6 h-6" />
                    </button>
                    <button className="hover:bg-gray-800">
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
