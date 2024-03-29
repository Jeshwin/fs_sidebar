import {
    ChevronDownIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ServerStackIcon,
} from "@heroicons/react/24/outline";
import {PlayIcon} from "@heroicons/react/24/solid";
import {RowTooltip} from "../tooltips/keybindTooltips";
import ThemeToggle from "../themetoggle";

export default function Navbar() {
    return (
        <div className="w-screen px-2 py-1 flex items-center space-x-1 bg-slate-50 dark:bg-slate-900 dark:text-white">
            <button className="p-1 flex items-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <p className="pl-1 font-mono">CodeNest</p>
                <ChevronDownIcon className="w-3 h-3 m-0.5" />
            </button>
            <button className="p-1 flex items-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <p className="pl-1">LongFlutesWrapSuprisedBubbles</p>
                <ChevronDownIcon className="w-3 h-3 m-0.5" />
            </button>
            <RowTooltip
                text="Health"
                keybind={{
                    windows: ["Control", "G"],
                    mac: ["Command", "G"],
                    linux: ["Super", "G"],
                }}
            >
                <button className="relative p-1 rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-red-500"></span>
                    <ServerStackIcon className="w-6 h-6" />
                </button>
            </RowTooltip>
            <div className="flex-grow"></div>
            <RowTooltip
                text="Run"
                keybind={{
                    windows: ["Control", "R"],
                    mac: ["Command", "R"],
                    linux: ["Super", "R"],
                }}
            >
                <button className="p-1 rounded-lg hover:bg-green-100 hover:dark:bg-green-900">
                    <PlayIcon className="w-6 h-6 text-green-500" />
                </button>
            </RowTooltip>
            <div className="relative w-fit p-1 flex items-center">
                <MagnifyingGlassIcon className="absolute top-2 left-2 w-5 h-5 m-0.5" />
                <input
                    placeholder="Search"
                    className="p-1 pl-7 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-indigo-200 hover:dark:bg-indigo-800 focus:outline-none"
                ></input>
            </div>
            <RowTooltip text="Inbox">
                <button className="relative p-1 rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-green-500"></span>
                    <InboxIcon className="w-6 h-6" />
                </button>
            </RowTooltip>
            <RowTooltip
                text="Help"
                keybind={{
                    windows: ["Control", "H"],
                    mac: ["Command", "H"],
                    linux: ["Super", "H"],
                }}
            >
                <button className="p-1 rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                </button>
            </RowTooltip>
            <RowTooltip
                text="Toggle Theme"
                keybind={{
                    windows: ["Control", "Shift", "B"],
                    mac: ["Command", "Shift", "B"],
                    linux: ["Super", "Shift", "B"],
                }}
            >
                <ThemeToggle />
            </RowTooltip>
            <button className="p-1 rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <img
                    className="w-6 h-6 rounded-full ring-2 ring-green-500"
                    src="https://api.toucanny.net/avatar?userid=random&w=480"
                    alt="Avatar"
                />
            </button>
        </div>
    );
}
