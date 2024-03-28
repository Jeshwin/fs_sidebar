import {
    ArrowLeftEndOnRectangleIcon,
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ServerStackIcon,
} from "@heroicons/react/24/outline";
import {PlayIcon} from "@heroicons/react/24/solid";
import {useContext} from "react";
import SidebarControllerContext from "../context/sidebarControllerProvider";
import KeybindTooltip from "../tooltips/keybindTooltip";

export default function Navbar() {
    const {showSidebar, toggleSidebar} = useContext(SidebarControllerContext);
    return (
        <div className="w-screen px-2 py-1 flex items-center space-x-1 bg-slate-900 text-white">
            {showSidebar ? (
                <KeybindTooltip text="Close Explorer (Ctrl-`)">
                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-lg hover:bg-indigo-900"
                    >
                        <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
                    </button>
                </KeybindTooltip>
            ) : (
                <KeybindTooltip text="Open Explorer (Ctrl-`)">
                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-lg hover:bg-indigo-900"
                    >
                        <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                    </button>
                </KeybindTooltip>
            )}
            <button className="p-1 flex items-center rounded-lg hover:bg-indigo-900">
                <p className="pl-1">Example Project</p>
                <ChevronDownIcon className="w-3 h-3 m-0.5" />
            </button>
            <KeybindTooltip text="Health (Ctrl-G)">
                <button className="relative p-1 rounded-lg hover:bg-indigo-900">
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-red-500"></span>
                    <ServerStackIcon className="w-6 h-6" />
                </button>
            </KeybindTooltip>
            <div className="flex-grow"></div>
            <KeybindTooltip text="Run (Ctrl-R)">
                <button className="p-1 rounded-lg hover:bg-green-900">
                    <PlayIcon className="w-6 h-6 text-green-500" />
                </button>
            </KeybindTooltip>
            <div className="relative w-fit p-1 flex items-center">
                <MagnifyingGlassIcon className="absolute top-2 left-2 w-5 h-5 m-0.5" />
                <input
                    placeholder="Search"
                    className="p-1 pl-7 rounded-lg bg-slate-800 hover:bg-indigo-800 focus:outline-none"
                ></input>
            </div>
            <KeybindTooltip text="Inbox">
                <button className="relative p-1 rounded-lg hover:bg-indigo-900">
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-green-500"></span>
                    <InboxIcon className="w-6 h-6" />
                </button>
            </KeybindTooltip>
            <KeybindTooltip text="Help (Cmd-H)">
                <button className="p-1 rounded-lg hover:bg-indigo-900">
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                </button>
            </KeybindTooltip>
            <KeybindTooltip text="Settings (Cmd-Shift-,)">
                <button className="p-1 rounded-lg hover:bg-indigo-900">
                    <Cog6ToothIcon className="w-6 h-6" />
                </button>
            </KeybindTooltip>

            <button className="p-1 rounded-lg hover:bg-indigo-900">
                <img
                    className="w-6 h-6 rounded-full ring-2 ring-green-500"
                    src="https://api.toucanny.net/avatar?userid=random&w=480"
                    alt="Avatar"
                />
            </button>
        </div>
    );
}
