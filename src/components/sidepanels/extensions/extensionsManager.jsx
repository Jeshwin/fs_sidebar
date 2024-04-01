import {useContext} from "react";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function ExtensionsManager() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);

    return (
        <div
            className={`${
                sidePanelSelection !== "extensions-manager" ? "hidden" : ""
            } w-full h-full bg-green-500 bg-opacity-25 grid place-content-center`}
        >
            <div className="text-6xl text-center">Extensions Manager</div>
        </div>
    );
}
