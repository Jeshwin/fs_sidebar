import {useContext} from "react";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function SecretsManager() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    return (
        <div
            className={`${
                sidePanelSelection !== "secrets-manager" ? "hidden" : ""
            } w-full h-full bg-green-500 bg-opacity-25 grid place-content-center`}
        >
            <div className="text-center">Secrets Manager</div>
        </div>
    );
}
