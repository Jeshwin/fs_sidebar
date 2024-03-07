import {FileStructureProvider} from "./components/context/fileStructureProvider";
import FileExplorer from "./components/fileExplorer";
import {TooltipPositionProvider} from "./components/context/tooltipProvider";
import ToolTipMenu from "./components/tooltipMenu";
import {CurrentFileProvider} from "./components/context/currentFileProvider";
import SelectedFileInfo from "./components/selectedFileInfo";

export default function App() {
    return (
        <FileStructureProvider>
            <CurrentFileProvider>
                <TooltipPositionProvider>
                    <div id="modal-root"></div>
                    <ToolTipMenu />
                    <FileExplorer />
                    <SelectedFileInfo />
                </TooltipPositionProvider>
            </CurrentFileProvider>
        </FileStructureProvider>
    );
}
