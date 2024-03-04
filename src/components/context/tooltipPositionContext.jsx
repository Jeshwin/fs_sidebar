import {createContext, useState} from "react";

const TooltipPositionContext = createContext();

// Create fileStructure provider
export const TooltipPositionProvider = ({children}) => {
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
    const [tooltipPath, setTooltipPath] = useState("");

    return (
        <TooltipPositionContext.Provider
            value={{
                tooltipPosition,
                setTooltipPosition,
                tooltipPath,
                setTooltipPath,
            }}
        >
            {children}
        </TooltipPositionContext.Provider>
    );
};

export default TooltipPositionContext;
