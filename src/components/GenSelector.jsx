import { useContext } from "react";
import { indexApi } from "../api/api";
import PokedexContext from "../contexts/PokedexContext";
import { pokedexUrl } from "../globals/globals";

const genOption = [1, 2, 3, 4, 5, 6, 7];

function GenSelector({ genSelected, setHasMore }) {
    const { setPokedex } = useContext(PokedexContext);
    const handleGenChange = async (e) => {
        const filteredPokedex = await indexApi(pokedexUrl, {
            params: { gen: e.target.value, refetch: true, start: 0 },
        });
        if (filteredPokedex) {
            setPokedex(filteredPokedex);
            setHasMore(true);
        }
    };
    return (
        <div className="flex items-center gap-2 p-1 text-lg capitalize bg-blue-600 rounded-md ">
            <label htmlFor="gen">Choose generation:</label>
            <select
                value={genSelected}
                onChange={handleGenChange}
                className="bg-transparent rounded-md cursor-pointer outline outline-1 outline-none focus:outline-white [&>option]:text-black"
                name="gen"
                id="gen"
            >
                {genOption.map((opt) => (
                    <option key={opt} value={opt}>
                        #{opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default GenSelector;
