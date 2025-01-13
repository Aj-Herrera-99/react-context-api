import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import { showApi } from "../api/api";
import PokedexContext from "../contexts/PokedexContext";
import { pokedexUrl } from "../globals/globals";

function PokemonShow() {
    const { pokedex } = useContext(PokedexContext); //* solo per fallback
    const [pokemon, setPokemon] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const pokemon = await showApi(`${pokedexUrl}/${id}`, null);
            if (pokemon) {
                setPokemon(pokemon);
            } else {
                const pkmnFb = pokedex.find((pkmn) => pkmn.id == id); //* pokedexFallback
                pkmnFb ? setPokemon(pkmnFb) : navigate("/errors");
            }
        })();
    }, [id, navigate, pokedex]);

    return (
        <div className="flex flex-col items-center h-full">
            <h1 className="mt-4 mb-8 text-4xl uppercase">Pokemon #{id}</h1>
            {pokemon && <Card pokemon={pokemon} />}
        </div>
    );
}

export default PokemonShow;
