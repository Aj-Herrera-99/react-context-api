import React from "react";

function Alert({ type, message }) {
    if (!message || !type) {
        return null;
    }

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
            className="px-4 py-1 uppercase border rounded-md alert"
        >
            Alert
        </div>
    );
}

export default Alert;
