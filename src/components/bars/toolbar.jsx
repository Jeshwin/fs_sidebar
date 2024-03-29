import {
    BeakerIcon,
    BookOpenIcon,
    CodeBracketIcon,
    CommandLineIcon,
    CubeIcon,
    DocumentDuplicateIcon,
    GlobeAltIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
    PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import {ColumnTooltip} from "../tooltips/keybindTooltips";

// Git icon, because Heroicons is stupid
function GitIcon({className}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 512 512"
        >
            <circle
                cx="160"
                cy="96"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
            <circle
                cx="160"
                cy="416"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M160 368V144"
            />
            <circle
                cx="352"
                cy="160"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
            <path
                d="M352 208c0 128-192 48-192 160"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
        </svg>
    );
}

export default function ToolBar() {
    return (
        <div className="h-full px-2 pb-4 bg-slate-50 dark:bg-slate-900 flex flex-col items-center space-y-2">
            <ColumnTooltip
                text="File Explorer"
                keybind={{
                    windows: ["Option", "1"],
                    mac: ["Option", "1"],
                    linux: ["Option", "1"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <DocumentDuplicateIcon className="w-6 h-6 " />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Tests"
                keybind={{
                    windows: ["Option", "2"],
                    mac: ["Option", "2"],
                    linux: ["Option", "2"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <BeakerIcon className="w-6 h-6 " />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Git"
                keybind={{
                    windows: ["Option", "3"],
                    mac: ["Option", "3"],
                    linux: ["Option", "3"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <GitIcon className="w-6 h-6" />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Code Search"
                keybind={{
                    windows: ["Option", "4"],
                    mac: ["Option", "4"],
                    linux: ["Option", "4"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Packages"
                keybind={{
                    windows: ["Option", "5"],
                    mac: ["Option", "5"],
                    linux: ["Option", "5"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <CubeIcon className="w-6 h-6" />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Secrets"
                keybind={{
                    windows: ["Option", "6"],
                    mac: ["Option", "6"],
                    linux: ["Option", "6"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <LockClosedIcon className="w-6 h-6 " />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Extensions"
                keybind={{
                    windows: ["Option", "7"],
                    mac: ["Option", "7"],
                    linux: ["Option", "7"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <PuzzlePieceIcon className="w-6 h-6 " />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Documentation"
                keybind={{
                    windows: ["Option", "7"],
                    mac: ["Option", "7"],
                    linux: ["Option", "7"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <BookOpenIcon className="w-6 h-6 " />
                </button>
            </ColumnTooltip>
            <div className="flex-grow"></div>
            <ColumnTooltip
                text="Shell"
                keybind={{
                    windows: ["Option", "8"],
                    mac: ["Option", "8"],
                    linux: ["Option", "8"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-300 hover:dark:bg-indigo-700">
                    <CommandLineIcon className="w-6 h-6" />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Networking"
                keybind={{
                    windows: ["Option", "9"],
                    mac: ["Option", "9"],
                    linux: ["Option", "9"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <GlobeAltIcon className="w-6 h-6" />
                </button>
            </ColumnTooltip>
            <ColumnTooltip
                text="Console"
                keybind={{
                    windows: ["Option", "0"],
                    mac: ["Option", "0"],
                    linux: ["Option", "0"],
                }}
            >
                <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                    <CodeBracketIcon className="w-6 h-6" />
                </button>
            </ColumnTooltip>
        </div>
    );
}
