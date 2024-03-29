import {createContext, useState} from "react";
const SidePanelControllerContext = createContext();

// Whether or not to show the sidePanel
export const SidePanelControllerProvider = ({children}) => {
    const [showSidePanel, setShowSidePanel] = useState(true);

    const toggleSidePanel = () => {
        setShowSidePanel(!showSidePanel);
    };

    return (
        <SidePanelControllerContext.Provider
            value={{
                showSidePanel,
                toggleSidePanel,
            }}
        >
            {children}
        </SidePanelControllerContext.Provider>
    );
};

export default SidePanelControllerContext;
