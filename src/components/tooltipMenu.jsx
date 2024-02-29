import {createPortal} from "react-dom";

export default function ToolTipMenu({path}) {
    return createPortal(
        <div
            style={{
                transform: "translate(394px, -192px)",
            }}
            className="w-48 z-50 p-1 rounded-lg shadow bg-sky-900"
        >
            Edit {path}
        </div>,
        document.getElementById("tooltip-root")
    );
}
