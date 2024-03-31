import {useContext, useRef, useState, useEffect} from "react";
import SidePanelControllerContext from "./context/sidePanelControllerProvider";
import FileExplorer from "./sidepanels/fileexplorer/fileExplorer";
import TestingPanel from "./sidepanels/testingpanel/testingPanel";
import GitManager from "./sidepanels/gitmanager/gitManager";
import CodeSearch from "./sidepanels/codesearch/codeSearch";
import PackageManager from "./sidepanels/packagemanager/packageManager";
import SecretsManager from "./sidepanels/secretsmanager/secretsManager";
import ExtensionsManager from "./sidepanels/extensions/extensionsManager";
import DocumentationPanel from "./sidepanels/documentation/documentationPanel";

export default function IDE() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    const handlebarRef = useRef(null); // Ref for the handlebar
    const [isDragging, setIsDragging] = useState(false);
    const [sidePanelWidth, setSidePanelWidth] = useState(384);
    const minSidePanelWidth = 240;
    const maxSidePanelWidth = 6000;
    const toolbarWidth = 48;

    // Map sidePanelSelection to components
    const sidePanelMap = {
        "file-explorer": <FileExplorer />,
        "testing-panel": <TestingPanel />,
        "git-manager": <GitManager />,
        "code-search": <CodeSearch />,
        "package-manager": <PackageManager />,
        "secrets-manager": <SecretsManager />,
        "extensions-manager": <ExtensionsManager />,
        "documentation-explorer": <DocumentationPanel />,
    };

    // Start dragging
    const startDragging = (e) => {
        e.preventDefault(); // Prevent text selection during drag
        setIsDragging(true);
    };

    useEffect(() => {
        const handleDragging = (e) => {
            if (isDragging) {
                // Adjust width based on handlebar position
                setSidePanelWidth(
                    Math.min(
                        Math.max(e.clientX - toolbarWidth, minSidePanelWidth),
                        maxSidePanelWidth
                    )
                );
            }
        };

        // Stop dragging
        const stopDragging = () => setIsDragging(false);

        document.addEventListener("mousemove", handleDragging);
        document.addEventListener("mouseup", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleDragging);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging]);

    return (
        <div className="w-full h-full flex">
            <div
                style={{
                    width: `${
                        sidePanelSelection !== "" ? sidePanelWidth : 0
                    }px`,
                    maxWidth: `50%`,
                }}
            >
                {sidePanelSelection && sidePanelMap[sidePanelSelection]}
            </div>
            <div
                ref={handlebarRef}
                onMouseDown={startDragging}
                className="h-full w-2 grid place-content-center select-none cursor-col-resize"
            >
                <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
            </div>
            <div className="flex-1">
                <div className="w-full h-full pr-1 pb-1 flex">
                    <div className="h-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                        <div className="w-full h-full grid place-content-center">
                            <p className="text-9xl font-bold text-center">0</p>
                        </div>
                    </div>
                    <div className="h-full w-2 rounded-full grid place-content-center select-none cursor-col-resize">
                        <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
                    </div>
                    <div className="h-full flex-1 flex flex-col">
                        <div className="w-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                            <div className="w-full h-full grid place-content-center">
                                <p className="text-9xl font-bold text-center">
                                    1
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-2 rounded-full grid place-content-center select-none cursor-row-resize">
                            <div className="w-6 h-0.5 my-1 rounded-full bg-slate-950 dark:bg-white"></div>
                        </div>
                        <div className="w-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                            <div className="w-full h-full grid place-content-center">
                                <p className="text-9xl font-bold text-center">
                                    2
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
