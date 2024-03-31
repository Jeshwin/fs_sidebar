import {useEffect, useRef, useState} from "react";

export default function DocumentationPanel() {
    const [dimensions, setDimensions] = useState({x: 384, y: 900});
    const documentationPanelRef = useRef(null);

    useEffect(() => {
        const updateSize = () => {
            if (
                documentationPanelRef.current &&
                documentationPanelRef.current.parentNode
            ) {
                setDimensions({
                    x: documentationPanelRef.current.parentNode.offsetWidth,
                    y: documentationPanelRef.current.parentNode.offsetHeight,
                });
            }
        };

        // Initial size update
        updateSize();

        // Create a ResizeObserver to listen for changes in size of the parent node
        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        if (
            documentationPanelRef.current &&
            documentationPanelRef.current.parentNode
        ) {
            resizeObserver.observe(documentationPanelRef.current.parentNode);
        }

        // Cleanup function to disconnect the observer
        return () => resizeObserver.disconnect();
    }, [setDimensions]);

    return (
        <div
            className="w-full h-full bg-green-950 grid place-content-center"
            ref={documentationPanelRef}
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
