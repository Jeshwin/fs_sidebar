import {useContext} from "react";
import BottomPanelControllerContext from "../../context/bottomPanelControllerProvider";

export default function CloudShell() {
    const {bottomPanelSelection} = useContext(BottomPanelControllerContext);
    return (
        <div
            className={`${
                bottomPanelSelection !== "cloud-shell" ? "hidden" : ""
            } w-full h-full bg-sky-950 grid place-content-center`}
        >
            <div className="text-6xl text-center">Shell</div>
        </div>
    );
}
