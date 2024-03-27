import {FileStructureProvider} from "./components/context/fileStructureProvider";
import {TooltipPositionProvider} from "./components/context/tooltipProvider";
import {NewElementProvider} from "./components/context/newElementProvider";
import FileExplorer from "./components/fileExplorer";
import ToolTipMenu from "./components/tooltipMenu";
import SelectedFileInfo from "./components/selectedFileInfo";

export default function App() {
    return (
        <FileStructureProvider>
            <NewElementProvider>
                <TooltipPositionProvider>
                    <div id="modal-root"></div>
                    <ToolTipMenu />
                    <FileExplorer />
                    <SelectedFileInfo />
                </TooltipPositionProvider>
            </NewElementProvider>
        </FileStructureProvider>
    );
}
