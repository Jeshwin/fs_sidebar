import {useContext, useEffect, useState} from "react";
import SidePanelControllerContext from "../../context/sidePanelControllerProvider";

export default function DocumentationPanel() {
    const {sidePanelSelection} = useContext(SidePanelControllerContext);
    const [dimensions, setDimensions] = useState({x: 384, y: 900});

    useEffect(() => {
        const updateSize = () => {
            if (document.getElementById("side-panel")) {
                setDimensions({
                    x: document.getElementById("side-panel").offsetWidth,
                    y: document.getElementById("side-panel").offsetHeight,
                });
            }
        };

        // Initial size update
        updateSize();

        // Create a ResizeObserver to listen for changes in size of the parent node
        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        if (document.getElementById("side-panel")) {
            resizeObserver.observe(document.getElementById("side-panel"));
        }

        // Cleanup function to disconnect the observer
        return () => resizeObserver.disconnect();
    }, [setDimensions]);

    return (
        <div
            className={`${
                sidePanelSelection !== "documentation-panel" ? "hidden" : ""
            } w-full h-full grid place-content-center`}
        >
            <iframe
                title="Replit Docs"
                width={dimensions.x}
                height={dimensions.y}
                className=" min-w-full"
                src="https://docs.replit.com/"
            ></iframe>
        </div>
    );
}
