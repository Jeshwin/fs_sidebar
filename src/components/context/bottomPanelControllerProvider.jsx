import {createContext, useState} from "react";
const BottomPanelControllerContext = createContext();

// Whether or not to show the sidePanel
export const BottomPanelControllerProvider = ({children}) => {
    const [bottomPanelSelection, setBottomPanelSelection] =
        useState("console-output");

    /**
     * Possble side panels:
     * - cloud-shell: Shell
     * - networking: Networking
     * - console-output: Console (default)
     */

    return (
        <BottomPanelControllerContext.Provider
            value={{
                bottomPanelSelection,
                setBottomPanelSelection,
            }}
        >
            {children}
        </BottomPanelControllerContext.Provider>
    );
};

export default BottomPanelControllerContext;
