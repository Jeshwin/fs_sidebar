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
import CloudShell from "./bottompanels/cloudshell/cloudShell";
import NetworkingPanel from "./bottompanels/networking/networkingPanel";
import ConsoleOutput from "./bottompanels/console/consoleOutput";
import BottomPanelControllerContext from "./context/bottomPanelControllerProvider";

export default function IDE() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    const {bottomPanelSelection} = useContext(BottomPanelControllerContext);
    const sidePanelHandlebarRef = useRef(null);
    const [sidePanelIsDragging, setSidePanelIsDragging] = useState(false);
    const [sidePanelWidth, setSidePanelWidth] = useState(384);
    const bottomPanelHandlebarRef = useRef(null);
    const [bottomPanelIsDragging, setBottomPanelIsDragging] = useState(false);
    const [bottomPanelHeight, setBottomPanelHeight] = useState(384);
    const minSidePanelWidth = 240;
    const maxSidePanelWidth = 1600;
    const minBottomPanelHeight = 0;
    const toolbarWidth = 48;

    const sidePanelStartDragging = (e) => {
        e.preventDefault(); // Prevent text selection during drag
        setSidePanelIsDragging(true);
    };

    const bottomPanelStartDragging = (e) => {
        e.preventDefault(); // Prevent text selection during drag
        setBottomPanelIsDragging(true);
    };

    useEffect(() => {
        const handleDragging = (e) => {
            if (sidePanelIsDragging) {
                // Adjust width based on handlebar position
                setSidePanelWidth(
                    Math.min(
                        Math.max(e.clientX - toolbarWidth, minSidePanelWidth),
                        maxSidePanelWidth
                    )
                );
            }
            if (bottomPanelIsDragging) {
                setBottomPanelHeight(
                    Math.max(
                        document.body.offsetHeight - e.clientY - 8,
                        minBottomPanelHeight
                    )
                );
            }
        };

        // Stop dragging
        const stopDragging = () => {
            setSidePanelIsDragging(false);
            setBottomPanelIsDragging(false);
        };

        document.addEventListener("mousemove", handleDragging);
        document.addEventListener("mouseup", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleDragging);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [bottomPanelIsDragging, sidePanelIsDragging]);

    return (
        <div className="w-full h-full flex">
            <div
                id="side-panel"
                style={{
                    width: `${
                        sidePanelSelection !== "" ? sidePanelWidth : 0
                    }px`,
                    maxWidth: `90%`,
                }}
            >
                <FileExplorer />
                <TestingPanel />
                <GitManager />
                <CodeSearch />
                <PackageManager />
                <SecretsManager />
                <ExtensionsManager />
                <DocumentationPanel />
            </div>
            <div
                ref={sidePanelHandlebarRef}
                onMouseDown={sidePanelStartDragging}
                className="h-full w-2 grid place-content-center select-none cursor-col-resize"
            >
                <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
            </div>
            <div className="flex-1 w-full h-full flex flex-col-reverse">
                <div
                    id="bottom-panel"
                    style={{
                        height: `${
                            bottomPanelSelection !== "" ? bottomPanelHeight : 0
                        }px`,
                        maxHeight: "90%",
                    }}
                >
                    <CloudShell />
                    <NetworkingPanel />
                    <ConsoleOutput />
                </div>
                <div
                    ref={bottomPanelHandlebarRef}
                    onMouseDown={bottomPanelStartDragging}
                    className="w-full h-2 grid place-content-center select-none cursor-row-resize"
                >
                    <div className="w-6 h-0.5 my-1 rounded-full bg-slate-950 dark:bg-white"></div>
                </div>
                <div className="flex-1">
                    <div className="w-full h-full pr-1 pb-1 flex">
                        <div className="h-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                            <div className="w-full h-full grid place-content-center">
                                <p className="text-9xl font-bold text-center">
                                    0
                                </p>
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
        </div>
    );
}
