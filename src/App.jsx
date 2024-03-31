import {FileStructureProvider} from "./components/context/fileStructureProvider";
import {TooltipPositionProvider} from "./components/context/tooltipProvider";
import {NewElementProvider} from "./components/context/newElementProvider";
import {SidePanelControllerProvider} from "./components/context/sidePanelControllerProvider";
import {BottomPanelControllerProvider} from "./components/context/bottomPanelControllerProvider";
import ToolTipMenu from "./components/tooltips/tooltipMenu";
import SelectedFileInfo from "./components/selectedFileInfo";
import Navbar from "./components/bars/navbar";
import IDE from "./components/IDE";
import ToolBar from "./components/bars/toolbar";

export default function App() {
    return (
        <FileStructureProvider>
            <SidePanelControllerProvider>
                <BottomPanelControllerProvider>
                    <NewElementProvider>
                        <TooltipPositionProvider>
                            <div className="w-screen h-screen bg-slate-50 dark:bg-slate-900 dark:text-white">
                                <div id="modal-root"></div>
                                <Navbar />
                                <ToolTipMenu />
                                <SelectedFileInfo />
                                <div className="flex h-[calc(100%-48px)]">
                                    <ToolBar />
                                    <IDE />
                                </div>
                            </div>
                        </TooltipPositionProvider>
                    </NewElementProvider>
                </BottomPanelControllerProvider>
            </SidePanelControllerProvider>
        </FileStructureProvider>
    );
}
