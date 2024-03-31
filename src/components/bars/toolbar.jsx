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
import {useContext} from "react";
import SidePanelControllerContext from "../context/sidePanelControllerProvider";

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
    const {sidePanelSelection, setSidePanelSelection} = useContext(
        SidePanelControllerContext
    );

    // Map sidePanelSelection to icons and keybinds
    const sidePanelMap = {
        "file-explorer": {
            icon: <DocumentDuplicateIcon className="w-6 h-6" />,
            text: "Files",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "testing-panel": {
            icon: <BeakerIcon className="w-6 h-6" />,
            text: "Tests",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "git-manager": {
            icon: <GitIcon className="w-6 h-6" />,
            text: "Git",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "code-search": {
            icon: <MagnifyingGlassIcon className="w-6 h-6" />,
            text: "Search",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "package-manager": {
            icon: <CubeIcon className="w-6 h-6" />,
            text: "Packages",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "secrets-manager": {
            icon: <LockClosedIcon className="w-6 h-6" />,
            text: "Secrets",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "extensions-manager": {
            icon: <PuzzlePieceIcon className="w-6 h-6" />,
            text: "Extensions",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
        "documentation-explorer": {
            icon: <BookOpenIcon className="w-6 h-6" />,
            text: "Documentation",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
    };

    return (
        <div className="h-full px-2 pb-4 bg-slate-50 dark:bg-slate-900 flex flex-col items-center space-y-2">
            {Object.keys(sidePanelMap).map((key, index) => (
                <ColumnTooltip
                    key={index}
                    text={sidePanelMap[key].text}
                    keybind={sidePanelMap[key].keybind}
                >
                    <button
                        onClick={() =>
                            setSidePanelSelection(
                                sidePanelSelection !== key ? key : ""
                            )
                        }
                        className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900"
                    >
                        {sidePanelMap[key].icon}
                    </button>
                </ColumnTooltip>
            ))}
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
