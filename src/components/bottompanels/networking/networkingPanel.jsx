import {useContext} from "react";
import BottomPanelControllerContext from "../../context/bottomPanelControllerProvider";

export default function NetworkingPanel() {
    const {bottomPanelSelection} = useContext(BottomPanelControllerContext);
    return (
        <div
            className={`${
                bottomPanelSelection !== "networking" ? "hidden" : ""
            } w-full h-full bg-sky-950 grid place-content-center`}
        >
            <div className="text-6xl text-center">Networking Panel</div>
        </div>
    );
}
