import {useContext} from "react";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function GitManager() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    return (
        <div
            className={`${
                sidePanelSelection !== "git-manager" ? "hidden" : ""
            } w-full h-full bg-green-500 bg-opacity-25 grid place-content-center`}
        >
            <div className="text-6xl text-center">Git Manager</div>
        </div>
    );
}
