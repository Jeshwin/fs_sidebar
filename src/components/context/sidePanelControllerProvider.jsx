import {createContext, useState} from "react";
const SidePanelControllerContext = createContext();

// Whether or not to show the sidePanel
export const SidePanelControllerProvider = ({children}) => {
    const [sidePanelSelection, setSidePanelSelection] =
        useState("file-explorer");

    return (
        <SidePanelControllerContext.Provider
            value={{
                sidePanelSelection,
                setSidePanelSelection,
            }}
        >
            {children}
        </SidePanelControllerContext.Provider>
    );
};

export default SidePanelControllerContext;
