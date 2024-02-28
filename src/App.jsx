import {FileStructureProvider} from "./components/context/fileStructureProvider";
import FileExplorer from "./components/fileExplorer";

export default function App() {
    return (
        <FileStructureProvider>
            <div id="modal-root"></div>
            <FileExplorer />
        </FileStructureProvider>
    );
}
