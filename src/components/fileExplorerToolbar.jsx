import {
    DocumentPlusIcon,
    EllipsisVerticalIcon,
    FolderPlusIcon,
} from "@heroicons/react/24/outline";

export default function FileExplorerToolbar() {
    return (
        <div className="w-full pl-4 p-1 rounded-t-lg bg-gray-950 text-white flex items-center">
            <div className="font-semibold flex-1">Explorer</div>
            <div className="font-semibold flex items-center gap-1">
                <button className="p-1 rounded hover:bg-gray-800">
                    <DocumentPlusIcon className="w-6 h-6" />
                </button>
                <button className="p-1 rounded hover:bg-gray-800">
                    <FolderPlusIcon className="w-6 h-6" />
                </button>
                <button className="p-1 rounded hover:bg-gray-800">
                    <EllipsisVerticalIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
