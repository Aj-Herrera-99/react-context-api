import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeApi } from "../api/api";
import PokedexContext from "../contexts/PokedexContext";
import { pokedexUrl } from "../globals/globals";
import { useAlertContext } from "../contexts/AlertContext";

const pokemonData = {
    name: "",
    type: [],
    base: {
        HP: 0,
        Attack: 0,
        Defense: 0,
        Speed: 0,
    },
};

// messi qui per semplicità, (da spostare in backend come db)
const type = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
];

const base = ["HP", "Attack", "Defense", "Speed"];

function PokemonStore() {
    const { setPokedex } = useContext(PokedexContext);
    const { setAlertData } = useAlertContext();
    const navigate = useNavigate();
    const [newPokemon, setNewPokemon] = useState(pokemonData);

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;
        const KEY = name;
        const VAL = value;
        switch (type) {
            case "text": {
                return setNewPokemon({
                    ...newPokemon,
                    [KEY]: VAL,
                });
            }
            case "checkbox": {
                const setTypes = new Set([...newPokemon.type]);
                checked ? setTypes.add(VAL) : setTypes.delete(VAL);
                return setNewPokemon({
                    ...newPokemon,
                    [KEY]: Array.from(setTypes),
                });
            }
            case "number": {
                return setNewPokemon({
                    ...newPokemon,
                    base: { ...newPokemon.base, [KEY]: VAL },
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { pokedex: pokedexUpdated, id } = await storeApi(
                pokedexUrl,
                newPokemon
            );
            setPokedex(pokedexUpdated);
            navigate(`/pokedex/${id}`);
            setAlertData({
                type: "success",
                message: `Pokemon #${id} aggiunto!`,
            });
        } catch (e) {
            console.error(e);
            navigate(`/pokedex/1`);
            setAlertData({
                type: "warning",
                message: `pokedexAPI non disponibile`,
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
                <label htmlFor="name" className="text-lg uppercase">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="p-1 rounded-md"
                    value={newPokemon.name}
                    onChange={handleInputChange}
                    required={true}
                    autoFocus={true}
                />
            </div>
            <label className="text-lg uppercase">Type:</label>
            <div className="grid grid-cols-3 gap-y-2 gap-x-8">
                {type.map((type, index) => (
                    <TypeInput
                        key={index}
                        type={type}
                        onChange={handleInputChange}
                    />
                ))}
            </div>
            <label className="text-lg uppercase">Base:</label>
            <div className="flex flex-wrap gap-6">
                {base.map((base, index) => (
                    <BaseInput
                        key={index}
                        el={base}
                        onChange={handleInputChange}
                    />
                ))}
            </div>
            <SubmitBtn>Generate Pokemon</SubmitBtn>
        </Form>
    );
}

function Form({ children, onSubmit }) {
    return (
        <form
            onSubmit={onSubmit}
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-3 p-4 text-white rounded-md bg-slate-700 [&_input]:text-black max-w-[90vw]"
        >
            {children}
        </form>
    );
}

function TypeInput({ type, onChange }) {
    return (
        <div className="flex gap-1">
            <input
                className="cursor-pointer"
                type="checkbox"
                id={type}
                name="type"
                value={type}
                onChange={onChange}
            />
            <label htmlFor={type} className="capitalize cursor-pointer">
                {type}
            </label>
        </div>
    );
}

function BaseInput({ el: base, onChange }) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor={base}>{base}:</label>
            <input
                type="number"
                id={base}
                name={base}
                min={1}
                max={250}
                className="p-1 rounded-md w-[50px]"
                onChange={onChange}
                required={true}
            />
        </div>
    );
}

function SubmitBtn({ children }) {
    return (
        <button
            type="submit"
            className="px-8 py-3 mx-auto mt-4 rounded-2xl bg-slate-800 w-fit hover:bg-slate-950"
        >
            {children}
        </button>
    );
}

export default PokemonStore;
