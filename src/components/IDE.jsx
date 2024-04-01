import {useState} from "react";
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
import InteractionBlanket from "./interactionBlanket";
import {ColumnHandleBar, RowHandleBar} from "./handleBars";

export default function IDE() {
    const [sidePanelWidth, setSidePanelWidth] = useState(384);
    const [bottomPanelHeight, setBottomPanelHeight] = useState(384);

    return (
        <div className="w-full h-full flex">
            <div
                id="side-panel"
                style={{
                    width: `${sidePanelWidth}px`,
                    position: "relative",
                    pointerEvents: "var(--interactionBlanketPointerEvents)",
                    userSelect: "var(--interactionBlanketUserSelect)",
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
                <InteractionBlanket />
            </div>
            <RowHandleBar
                setWidth={setSidePanelWidth}
                modifier={(x) => x - 48 - 8}
                minWidth={240}
                maxWidth={1600}
            />
            <div className="flex-1 w-full h-full flex flex-col-reverse">
                <div
                    id="bottom-panel"
                    style={{
                        height: `${bottomPanelHeight}px`,
                    }}
                    className="relative w-full h-full"
                >
                    <CloudShell />
                    <NetworkingPanel />
                    <ConsoleOutput />
                    <InteractionBlanket />
                </div>
                <ColumnHandleBar
                    setHeight={setBottomPanelHeight}
                    modifier={(y) => document.body.offsetHeight - y - 8}
                />
                <div className="flex-1">
                    <div className="w-full h-full pr-1 pb-1 flex">
                        <div className="h-full flex-1 relative rounded-lg bg-slate-100 dark:bg-slate-800">
                            <p className="w-full h-full grid place-content-center">
                                0
                            </p>
                            <InteractionBlanket />
                        </div>
                        <div className="h-full w-2 rounded-full grid place-content-center select-none cursor-col-resize">
                            <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
                        </div>
                        <div className="h-full flex-1 flex flex-col">
                            <div className="w-full flex-1 relative rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="w-full h-full grid place-content-center">
                                    1
                                </p>
                                <InteractionBlanket />
                            </div>
                            <div className="w-full h-2 rounded-full grid place-content-center select-none cursor-row-resize">
                                <div className="w-6 h-0.5 my-1 rounded-full bg-slate-950 dark:bg-white"></div>
                            </div>
                            <div className="w-full flex-1 relative rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="w-full h-full grid place-content-center">
                                    2
                                </p>
                                <InteractionBlanket />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
