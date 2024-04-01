import {useContext} from "react";
import BottomPanelControllerContext from "../../context/bottomPanelControllerProvider";

export default function CloudShell() {
    const {bottomPanelSelection} = useContext(BottomPanelControllerContext);
    return (
        <div
            className={`${
                bottomPanelSelection !== "cloud-shell" ? "hidden" : ""
            } w-full h-full bg-sky-500 bg-opacity-25 grid place-content-center`}
        >
            <div className="text-center">Shell</div>
        </div>
    );
}
