import {OpenFolderProvider} from "./components/context/openFolderProvider";
import {FileStructureProvider} from "./components/context/fileStructureProvider";
import FileExplorer from "./components/fileExplorer";

export default function App() {
    return (
        <FileStructureProvider>
            <OpenFolderProvider>
                <div className="w-screen h-screen bg-[var(--bg-1)]">
                    <div className="container mx-auto h-screen">
                        <div className="w-full h-full grid justify-center place-content-center">
                            <FileExplorer />
                        </div>
                    </div>
                </div>
            </OpenFolderProvider>
        </FileStructureProvider>
    );
}
