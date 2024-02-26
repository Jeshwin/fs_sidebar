import {FileStructureProvider} from "./components/context/fileStructureProvider";
import FileExplorer from "./components/fileExplorer";

export default function App() {
    return (
        <FileStructureProvider>
            <div className="container mx-auto bg-gray-800 text-gray-50 h-screen grid justify-center place-content-center">
                <FileExplorer />
            </div>
        </FileStructureProvider>
    );
}
