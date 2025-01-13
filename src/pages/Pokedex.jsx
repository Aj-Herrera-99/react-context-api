import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { indexApi } from "../api/api";
import Spinner from "../components/Spinner";
import pokedexFallback from "../data/pokedex.json"; //* solo per fallback
import { pokedexUrl } from "../globals/globals";
import PokedexContext from "../contexts/PokedexContext";
import { useAlertContext } from "../contexts/AlertContext";

function Pokedex() {
    const { setPokedex } = useContext(PokedexContext);
    const { setAlertData } = useAlertContext();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let params;
                if (!parseInt(sessionStorage.getItem("firstRender"))) {
                    sessionStorage.setItem("firstRender", "1");
                    params = {
                        refetch: true,
                    };
                } else {
                    params = { refetch: false };
                }
                const pokedexData = await indexApi(pokedexUrl, {
                    params,
                });
                if (!pokedexData) {
                    throw new Error("Errore fetch");
                }
                setPokedex(pokedexData);
            } catch (e) {
                setPokedex(pokedexFallback); //* pokedexFallback
                setAlertData({
                    type: "error",
                    message: "Connessione a pokedexAPI fallita!",
                });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="h-full">
                    <Spinner />
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default Pokedex;
