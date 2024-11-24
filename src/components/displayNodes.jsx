import {useState} from "react";
import {ColumnHandleBar, RowHandleBar} from "./handleBars";

export function RowNode({leftChild: LeftChild, rightChild: RightChild}) {
    const [panelWidth, setPanelWidth] = useState(384);

    return (
        <div className="w-full h-full flex flex-row">
            <div
                style={{
                    width: `${panelWidth}px`,
                    position: "relative",
                    pointerEvents: "var(--interactionBlanketPointerEvents)",
                    userSelect: "var(--interactionBlanketUserSelect)",
                }}
            >
                <LeftChild />
            </div>
            <RowHandleBar setWidth={setPanelWidth} modifier={(x) => x - 56} />
            <div className="flex-1">
                <RightChild />
            </div>
        </div>
    );
}

export function ReverseRowNode({leftChild: LeftChild, rightChild: RightChild}) {
    const [panelWidth, setPanelWidth] = useState(384);

    return (
        <div className="w-full h-full flex flex-row-reverse">
            <div
                style={{
                    width: `${panelWidth}px`,
                    position: "relative",
                    pointerEvents: "var(--interactionBlanketPointerEvents)",
                    userSelect: "var(--interactionBlanketUserSelect)",
                }}
            >
                <RightChild />
            </div>
            <RowHandleBar
                setWidth={setPanelWidth}
                modifier={(x) => document.body.offsetWidth - x - 8}
            />
            <div className="flex-1">
                <LeftChild />
            </div>
        </div>
    );
}

export function ColumnNode({topChild: TopChild, bottomChild: BottomChild}) {
    const [panelHeight, setPanelHeight] = useState(384);

    return (
        <div className="w-full h-full flex flex-col">
            <div
                style={{
                    height: `${panelHeight}px`,
                    position: "relative",
                    pointerEvents: "var(--interactionBlanketPointerEvents)",
                    userSelect: "var(--interactionBlanketUserSelect)",
                }}
            >
                <TopChild />
            </div>
            <ColumnHandleBar
                setHeight={setPanelHeight}
                modifier={(y) => y - 56}
            />
            <div className="flex-1">
                <BottomChild />
            </div>
        </div>
    );
}

export function ReverseColumnNode({
    topChild: TopChild,
    bottomChild: BottomChild,
}) {
    const [panelHeight, setPanelHeight] = useState(384);

    return (
        <div className="w-full h-full flex flex-col-reverse">
            <div
                style={{
                    height: `${panelHeight}px`,
                    position: "relative",
                    pointerEvents: "var(--interactionBlanketPointerEvents)",
                    userSelect: "var(--interactionBlanketUserSelect)",
                }}
            >
                <BottomChild />
            </div>
            <ColumnHandleBar
                setHeight={setPanelHeight}
                modifier={(y) => document.body.offsetHeight - y - 8}
            />
            <div className="flex-1">
                <TopChild />
            </div>
        </div>
    );
}
