import {FileStructureProvider} from "./components/context/fileStructureProvider";
import FileExplorer from "./components/fileExplorer";

export default function App() {
    return (
        <FileStructureProvider>
            <div className="w-screen h-screen bg-gray-800 text-gray-50">
                <div className="container mx-auto h-screen grid justify-center place-content-center">
                    <FileExplorer />
                </div>
            </div>
        </FileStructureProvider>
    );
}
