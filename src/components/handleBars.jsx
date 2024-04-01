import {useEffect, useState} from "react";

export function RowHandleBar({
    setWidth,
    modifier,
    minWidth = 0,
    maxWidth = document.body.offsetWidth,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const startDragging = (e) => {
        e.preventDefault();
        setIsDragging(true);
        // Activate the blanket div by changing CSS variables
        document.documentElement.style.setProperty(
            "--interactionBlanketPointerEvents",
            "none"
        );
        document.documentElement.style.setProperty(
            "--interactionBlanketUserSelect",
            "none"
        );
        document.documentElement.style.setProperty(
            "--interactionBlanketDisplay",
            "block"
        );
    };

    useEffect(() => {
        const handleDragging = (e) => {
            if (isDragging) {
                setWidth(
                    Math.min(Math.max(modifier(e.clientX), minWidth), maxWidth)
                );
            }
        };

        // Stop dragging
        const stopDragging = () => {
            setIsDragging(false);
            // Deactivate the blanket div by changing CSS variables
            document.documentElement.style.setProperty(
                "--interactionBlanketPointerEvents",
                "auto"
            );
            document.documentElement.style.setProperty(
                "--interactionBlanketUserSelect",
                "auto"
            );
            document.documentElement.style.setProperty(
                "--interactionBlanketDisplay",
                "none"
            );
        };

        document.addEventListener("mousemove", handleDragging);
        document.addEventListener("mouseup", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleDragging);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging, maxWidth, minWidth, modifier, setWidth]);

    return (
        <div
            onMouseDown={startDragging}
            className="h-full w-2 grid place-content-center select-none cursor-col-resize"
        >
            <div className="h-6 w-0.5 mx-1 rounded-full bg-slate-950 dark:bg-white"></div>
        </div>
    );
}

export function ColumnHandleBar({
    setHeight,
    modifier,
    minHeight = 0,
    maxHeight = document.body.offsetHeight,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const startDragging = (e) => {
        e.preventDefault();
        setIsDragging(true);
        // Activate the blanket div by changing CSS variables
        document.documentElement.style.setProperty(
            "--interactionBlanketPointerEvents",
            "none"
        );
        document.documentElement.style.setProperty(
            "--interactionBlanketUserSelect",
            "none"
        );
        document.documentElement.style.setProperty(
            "--interactionBlanketDisplay",
            "block"
        );
    };

    useEffect(() => {
        const handleDragging = (e) => {
            if (isDragging) {
                setHeight(
                    Math.min(
                        Math.max(modifier(e.clientY), minHeight),
                        maxHeight
                    )
                );
            }
        };

        // Stop dragging
        const stopDragging = () => {
            setIsDragging(false);
            // Deactivate the blanket div by changing CSS variables
            document.documentElement.style.setProperty(
                "--interactionBlanketPointerEvents",
                "auto"
            );
            document.documentElement.style.setProperty(
                "--interactionBlanketUserSelect",
                "auto"
            );
            document.documentElement.style.setProperty(
                "--interactionBlanketDisplay",
                "none"
            );
        };

        document.addEventListener("mousemove", handleDragging);
        document.addEventListener("mouseup", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleDragging);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging, maxHeight, minHeight, modifier, setHeight]);

    return (
        <div
            onMouseDown={startDragging}
            className="w-full h-2 grid place-content-center select-none cursor-row-resize"
        >
            <div className="w-6 h-0.5 my-1 rounded-full bg-slate-950 dark:bg-white"></div>
        </div>
    );
}
