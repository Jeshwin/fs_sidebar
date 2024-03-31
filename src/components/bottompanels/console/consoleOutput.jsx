import {useContext} from "react";
import BottomPanelControllerContext from "../../context/bottomPanelControllerProvider";

export default function ConsoleOutput() {
    const {bottomPanelSelection} = useContext(BottomPanelControllerContext);
    return (
        <div
            className={`${
                bottomPanelSelection !== "console-output" ? "hidden" : ""
            } w-full h-full bg-sky-950 grid place-content-center`}
        >
            <div className="text-6xl text-center">Console</div>
        </div>
    );
}
