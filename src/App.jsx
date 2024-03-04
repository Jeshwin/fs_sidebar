import {FileStructureProvider} from "./components/context/fileStructureProvider";
import FileExplorer from "./components/fileExplorer";
import {TooltipPositionProvider} from "./components/context/tooltipPositionContext";
import ToolTipMenu from "./components/tooltipMenu";

export default function App() {
    return (
        <FileStructureProvider>
            <div id="modal-root"></div>
            <TooltipPositionProvider>
                <ToolTipMenu />
                <FileExplorer />
            </TooltipPositionProvider>
        </FileStructureProvider>
    );
}
