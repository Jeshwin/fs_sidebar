import {createContext, useState} from "react";

const TooltipPositionContext = createContext();

// Create fileStructure provider
export const TooltipPositionProvider = ({children}) => {
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
    const [tooltipInfo, setTooltipInfo] = useState({
        type: "",
        path: "",
    });

    return (
        <TooltipPositionContext.Provider
            value={{
                tooltipPosition,
                setTooltipPosition,
                tooltipInfo,
                setTooltipInfo,
            }}
        >
            {children}
        </TooltipPositionContext.Provider>
    );
};

export default TooltipPositionContext;
