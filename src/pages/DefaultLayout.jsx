import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useAlertContext } from "../contexts/AlertContext";

function DefaultLayout() {
    const { alertData } = useAlertContext();
    const { type, message } = alertData;
    console.log(type);
    console.log(message);
    return (
        <>
            <Navbar />
            <main
                id="parentScrollDiv"
                className="relative !px-8 overflow-y-scroll text-white bg-slate-800 grow h-[100vh] [&_h1]:text-center sm:[&_h1]:text-start"
            >
                <Alert type={type} message={message} />
                <Outlet />
            </main>
        </>
    );
}

export default DefaultLayout;
