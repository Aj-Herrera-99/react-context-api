import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { indexApi } from "../api/api";
import Spinner from "../components/Spinner";
import pokedexFallback from "../data/pokedex.json"; //* solo per fallback
import PokedexContext from "../contexts/PokedexContext";
import { pokedexUrl } from "../globals/globals";

const START = 0;
const LIMIT = 30;

function Pokedex() {
    const [pokedex, setPokedex] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let params;
            if (!parseInt(sessionStorage.getItem("firstRender"))) {
                sessionStorage.setItem("firstRender", "1");
                let start = START;
                let limit = LIMIT;
                params = {
                    limit: limit,
                    start: start,
                };
            } else {
                params = null;
            }
            const pokedexData = await indexApi(pokedexUrl, {
                params,
            });
            pokedexData ? setPokedex(pokedexData) : setPokedex(pokedexFallback); //* pokedexFallback
            setIsLoading(false);
        })();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="h-full">
                    <Spinner />
                </div>
            ) : (
                <PokedexContext.Provider value={{ pokedex, setPokedex }}>
                    <Outlet />
                </PokedexContext.Provider>
            )}
        </>
    );
}

export default Pokedex;
