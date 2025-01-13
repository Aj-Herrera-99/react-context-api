import { useRef, useState } from "react";
import { indexApi } from "../api/api";
import { pokedexUrl } from "../globals/globals";

function OrderPokemons({ setPokedex }) {
    const selectRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleDropDown = () => {
        setIsClicked((curr) => !curr);
    };
    const handleOrder = async (e) => {
        if (e.target.tagName === "LI") {
            setIsClicked(false);
            const type = e.target.innerHTML;
            const params = {
                order: selectRef.current.value,
                type: type.toLowerCase(),
            };
            const orderedPokedex = await indexApi(pokedexUrl, { params });
            orderedPokedex && setPokedex(orderedPokedex);
        }
    };
    return (
        <div className="relative bg-blue-600 rounded-md hover:bg-blue-800">
            <div
                onClick={handleDropDown}
                className="flex items-center justify-center text-2xl w-[50px] aspect-square font-black cursor-pointer"
            >
                <i className="fa-solid fa-filter"></i>
            </div>
            {isClicked && (
                <div className="absolute z-20 py-4 pl-4 pr-8 text-white rounded-md -right-4 sm:-left-24 top-14 bg-slate-950">
                    <span>Order By:</span>
                    <select
                        ref={selectRef}
                        className="p-1 ml-2 bg-transparent rounded-md cursor-pointer outline outline-1 outline-white [&>option]:text-black"
                    >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                    <ul
                        onClick={handleOrder}
                        className="mt-2 flex flex-col gap-2 [&>li]:uppercase [&>li]:bg-blue-700 [&>li]:p-1 [&>li]:rounded-md [&>li]:tracking-wide [&>li]:font-semibold [&>li]:cursor-pointer hover:[&>li]:bg-blue-900"
                    >
                        <li>Default</li>
                        <li>Name</li>
                        <li>HP</li>
                        <li>Attack</li>
                        <li>Defense</li>
                        <li>Speed</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default OrderPokemons;
