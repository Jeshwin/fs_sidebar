import {FileStructureProvider} from "./components/context/fileStructureProvider";
import {TooltipPositionProvider} from "./components/context/tooltipProvider";
import {CurrentFileProvider} from "./components/context/currentFileProvider";
import {NewElementFolderProvider} from "./components/context/newElementFolderProvider";
import FileExplorer from "./components/fileExplorer";
import ToolTipMenu from "./components/tooltipMenu";
import SelectedFileInfo from "./components/selectedFileInfo";

export default function App() {
    return (
        <FileStructureProvider>
            <CurrentFileProvider>
                <NewElementFolderProvider>
                    <TooltipPositionProvider>
                        <div id="modal-root"></div>
                        <ToolTipMenu />
                        <FileExplorer />
                        <SelectedFileInfo />
                    </TooltipPositionProvider>
                </NewElementFolderProvider>
            </CurrentFileProvider>
        </FileStructureProvider>
    );
}
