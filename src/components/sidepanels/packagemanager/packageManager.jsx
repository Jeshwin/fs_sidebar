import {useContext} from "react";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function Package() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    return (
        <div
            className={`${
                sidePanelSelection !== "package-manager" ? "hidden" : ""
            } w-full h-full bg-green-950 grid place-content-center`}
        >
            <div className="text-6xl text-center">Package Manager</div>
        </div>
    );
}
