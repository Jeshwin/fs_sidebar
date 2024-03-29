import {
    BeakerIcon,
    CircleStackIcon,
    CodeBracketIcon,
    Cog6ToothIcon,
    CommandLineIcon,
    CubeIcon,
    GlobeAltIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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
        <div className="h-full px-2 bg-slate-50 dark:bg-slate-900 flex flex-col items-center space-y-1">
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <BeakerIcon className="w-6 h-6 " />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <GitIcon className="w-6 h-6" />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <CodeBracketIcon className="w-6 h-6" />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <CubeIcon className="w-6 h-6" />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <LockClosedIcon className="w-6 h-6 " />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-300 hover:dark:bg-indigo-700">
                <CommandLineIcon className="w-6 h-6" />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-100 hover:dark:bg-indigo-900">
                <GlobeAltIcon className="w-6 h-6" />
            </button>
            <button className="p-1 grid place-content-center rounded-lg hover:bg-indigo-300 hover:dark:bg-indigo-700">
                <Cog6ToothIcon className="w-6 h-6" />
            </button>
        </div>
    );
}
