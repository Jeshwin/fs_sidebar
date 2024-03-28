import {FileStructureProvider} from "./components/context/fileStructureProvider";
import {TooltipPositionProvider} from "./components/context/tooltipProvider";
import {NewElementProvider} from "./components/context/newElementProvider";
import {SidebarControllerContextProvider} from "./components/context/sidebarControllerProvider";
import FileExplorer from "./components/fileExplorer";
import ToolTipMenu from "./components/tooltips/tooltipMenu";
import SelectedFileInfo from "./components/selectedFileInfo";
import Navbar from "./components/bars/navbar";

export default function App() {
    return (
        <div className="w-screen h-screen bg-slate-900">
            <FileStructureProvider>
                <SidebarControllerContextProvider>
                    <NewElementProvider>
                        <TooltipPositionProvider>
                            <div id="modal-root"></div>
                            <Navbar />
                            <ToolTipMenu />
                            <FileExplorer />
                            <SelectedFileInfo />
                        </TooltipPositionProvider>
                    </NewElementProvider>
                </SidebarControllerContextProvider>
            </FileStructureProvider>
        </div>
    );
}
