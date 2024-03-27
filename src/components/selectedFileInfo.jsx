import {useContext} from "react";
import NewElementContext from "./context/newElementProvider";

export default function SelectedFileInfo() {
    const {currentFile} = useContext(NewElementContext);
    return (
        currentFile && (
            <div className="absolute bottom-0 right-0 bg-indigo-800 border border-indigo-500 text-indigo-50 p-2 rounded-tl-lg">
                Selected file: {currentFile}
            </div>
        )
    );
}
