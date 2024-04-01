import {useContext} from "react";
import BottomPanelControllerContext from "../../context/bottomPanelControllerProvider";

export default function ConsoleOutput() {
    const {bottomPanelSelection} = useContext(BottomPanelControllerContext);
    return (
        <div
            className={`${
                bottomPanelSelection !== "console-output" ? "hidden" : ""
            } w-full h-full bg-sky-500 bg-opacity-25 grid place-content-center`}
        >
            <div className="text-center">Console</div>
        </div>
    );
}
