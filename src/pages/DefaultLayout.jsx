import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <>
            <Navbar />
            <main id="parentScrollDiv" className="relative !px-8 overflow-y-scroll text-white bg-slate-800 grow h-[100vh] [&_h1]:text-center sm:[&_h1]:text-start">
                <Outlet />
            </main>
        </>
    );
}

export default DefaultLayout;
