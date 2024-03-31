import {
    BeakerIcon,
    BookOpenIcon,
    CommandLineIcon,
    ComputerDesktopIcon,
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
import BottomPanelControllerContext from "../context/bottomPanelControllerProvider";

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
    const {bottomPanelSelection, setBottomPanelSelection} = useContext(
        BottomPanelControllerContext
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
        "documentation-panel": {
            icon: <BookOpenIcon className="w-6 h-6" />,
            text: "Documentation",
            keybind: {
                windows: ["Option", "1"],
                mac: ["Option", "1"],
                linux: ["Option", "1"],
            },
        },
    };

    // Maps bottomPanelSelection to icons and keybinds
    const bottomPanelMap = {
        "cloud-shell": {
            icon: <CommandLineIcon className="w-6 h-6" />,
            text: "Shell",
            keybind: {
                windows: ["Option", "`"],
                mac: ["Option", "`"],
                linux: ["Option", "`"],
            },
        },
        networking: {
            icon: <GlobeAltIcon className="w-6 h-6" />,
            text: "Networking",
            keybind: {
                windows: ["Control", "N"],
                mac: ["Control", "N"],
                linux: ["Control", "N"],
            },
        },
        "console-output": {
            icon: <ComputerDesktopIcon className="w-6 h-6" />,
            text: "Console",
            keybind: {
                windows: ["Option", "R"],
                mac: ["Option", "R"],
                linux: ["Option", "R"],
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
            {Object.keys(bottomPanelMap).map((key, index) => (
                <ColumnTooltip
                    key={index}
                    text={bottomPanelMap[key].text}
                    keybind={bottomPanelMap[key].keybind}
                >
                    <button
                        onClick={() =>
                            setBottomPanelSelection(
                                bottomPanelSelection !== key ? key : ""
                            )
                        }
                        className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900"
                    >
                        {bottomPanelMap[key].icon}
                    </button>
                </ColumnTooltip>
            ))}
        </div>
    );
}
