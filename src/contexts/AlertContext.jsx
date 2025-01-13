import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

function AlertContextProvider({ children }) {
    const [alertData, setAlertData] = useState({ type: "", message: "" });
    return (
        <AlertContext.Provider value={{ alertData, setAlertData }}>
            {children}
        </AlertContext.Provider>
    );
}

const useAlertContext = () => {
    const context = useContext(AlertContext);
    return context;
};

export { AlertContextProvider, useAlertContext };
