import {useContext} from "react";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function CodeSearch() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    return (
        <div
            className={`${
                sidePanelSelection !== "code-search" ? "hidden" : ""
            } w-full h-full bg-green-950 grid place-content-center`}
        >
            <div className="text-6xl text-center">Code Search</div>
        </div>
    );
}
