import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const appLinks = [
    { to: "/", label: "Home" },
    { to: "/pokedex", label: "List" },
    { to: "/pokedex/store", label: "Create" },
    { to: "/about", label: "Chi Siamo" },
];

function Navbar() {
    const [isPokedexOpen, setIsPokedexOpen] = useState(false);
    const navRef = useRef(null);
    const hamRef = useRef(null);
    const href = window.location.href;
    const handleNavUI = () => {
        navRef?.current.classList.toggle("!block");
        navRef?.current.classList.toggle("!translate-x-0");
        hamRef?.current.classList.toggle("translate-x-[140px]");
        hamRef?.current.classList.toggle("fa-xmark");
    };

    useEffect(() => {
        if (href.includes("pokedex")) {
            setIsPokedexOpen(true);
        } else {
            setIsPokedexOpen(false);
        }
    }, [href]);

    // classes
    const navElClass =
        "p-2 border-b-2 text-white text-xl font-light tracking-widest uppercase hover:pb-4 transition-all rounded-md hover:bg-slate-800 cursor-pointer";

    return (
        <>
            <i
                ref={hamRef}
                onClick={handleNavUI}
                className={`block sm:hidden fa-solid fa-bars absolute top-0 left-0 text-white z-20 text-3xl cursor-pointer opacity-60 hover:opacity-100 transition-all`}
            ></i>
            <nav
                ref={navRef}
                className={`absolute translate-x-[-200px] sm:static sm:translate-x-0 z-10 top-0 left-0 bottom-0 border-r-2 bg-slate-950 border-r-white min-w-[200px] transition-all overflow-auto`}
            >
                <div className="flex flex-col gap-6 mt-10 sm:mt-0">
                    {appLinks
                        .filter((link) => !link.to.includes("pokedex"))
                        .map((link, index) => (
                            <NavLink
                                onClick={handleNavUI}
                                key={index}
                                to={link.to}
                                className={({ isActive }) =>
                                    navElClass +
                                    (isActive ? " bg-slate-600" : "")
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    <div
                        onMouseEnter={() => setIsPokedexOpen(true)}
                        onMouseLeave={() => {
                            if (!href.includes("pokedex")) {
                                setIsPokedexOpen(false);
                            }
                        }}
                    >
                        <div
                            className={`${navElClass} flex items-center justify-between`}
                        >
                            <span>Pokedex</span>
                            <i
                                className={`fa-solid fa-angle-down transition-all ${
                                    isPokedexOpen && "rotate-180"
                                }`}
                            ></i>
                        </div>
                        {isPokedexOpen && (
                            <div className={`flex flex-col gap-2 my-2`}>
                                {appLinks
                                    .filter((link) =>
                                        link.to.includes("pokedex")
                                    )
                                    .map((link, index) => (
                                        <NavLink
                                            onClick={handleNavUI}
                                            end={true}
                                            key={index}
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `${navElClass} self-end w-11/12 capitalize` +
                                                (isActive
                                                    ? " bg-slate-600"
                                                    : "")
                                            }
                                        >
                                            <span>{link.label}</span>
                                        </NavLink>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
