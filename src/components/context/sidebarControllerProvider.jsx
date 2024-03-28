import {createContext, useState} from "react";
const SidebarControllerContext = createContext();

// Whether or not to show the sidebar
export const SidebarControllerContextProvider = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <SidebarControllerContext.Provider
            value={{
                showSidebar,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarControllerContext.Provider>
    );
};

export default SidebarControllerContext;
