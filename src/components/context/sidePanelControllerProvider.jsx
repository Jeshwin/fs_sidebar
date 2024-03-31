import {createContext, useState} from "react";
const SidePanelControllerContext = createContext();

// Whether or not to show the sidePanel
export const SidePanelControllerProvider = ({children}) => {
    const [sidePanelSelection, setSidePanelSelection] =
        useState("file-explorer");

    /**
     * Possble side panels:
     * - file-explorer: Files (default)
     * - testing-panel: Tests
     * - git-manager: Git
     * - code-search: Search
     * - package-manager: Packages
     * - secrets-manager: Secrets
     * - extensions-manager: Extensions
     * - documentation-panel: Documentation
     */

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
