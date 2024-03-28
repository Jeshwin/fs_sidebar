import {FileStructureProvider} from "./components/context/fileStructureProvider";
import {TooltipPositionProvider} from "./components/context/tooltipProvider";
import {NewElementProvider} from "./components/context/newElementProvider";
import {SidebarControllerContextProvider} from "./components/context/sidebarControllerProvider";
import FileExplorer from "./components/fileExplorer";
import ToolTipMenu from "./components/tooltips/tooltipMenu";
import SelectedFileInfo from "./components/selectedFileInfo";
import Navbar from "./components/bars/navbar";
import IDE from "./components/ide/IDE";

export default function App() {
    return (
        <FileStructureProvider>
            <SidebarControllerContextProvider>
                <NewElementProvider>
                    <TooltipPositionProvider>
                        <div className="w-screen h-screen bg-slate-50 dark:bg-slate-900 dark:text-white">
                            <div id="modal-root"></div>
                            <Navbar />
                            <ToolTipMenu />
                            <SelectedFileInfo />
                            <div className="w-full h-[calc(100%-48px)] flex">
                                <div className="flex-1">
                                    <FileExplorer />
                                </div>
                                <IDE />
                            </div>
                        </div>
                    </TooltipPositionProvider>
                </NewElementProvider>
            </SidebarControllerContextProvider>
        </FileStructureProvider>
    );
}
