import React from "react";
import { useAlertContext } from "../contexts/AlertContext";

function Alert({ type, message }) {
    const { setAlertData } = useAlertContext();

    if (!message || !type) {
        return null;
    }

    const handleEscClick = () => {
        setAlertData({ type: "", message: "" });
    };

    const alertStyle = () => {
        switch (type) {
            case "success":
                return {
                    bgColor: "green",
                    textColor: "white",
                    borderColor: "green",
                };
            case "warning":
                return {
                    bgColor: "yellow",
                    textColor: "black",
                    borderColor: "yellow",
                };
            case "error":
                return {
                    bgColor: "red",
                    textColor: "white",
                    borderColor: "red",
                };
            default:
                return {
                    bgColor: "transparent",
                    textColor: "white",
                    borderColor: "white",
                };
        }
    };

    return (
        <div
            style={{
                borderColor: alertStyle()?.borderColor,
                backgroundColor: alertStyle()?.bgColor,
                color: alertStyle()?.textColor,
            }}
            className="px-6 py-1 text-lg border rounded-md alert opacity-60 hover:opacity-100 max-w-[250px] z-20"
        >
            {message}
            <i
                onClick={handleEscClick}
                className="absolute text-xl cursor-pointer top-1 right-1 fa-solid fa-xmark hover:text-red-800"
            ></i>
        </div>
    );
}

export default Alert;
