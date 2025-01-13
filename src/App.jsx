import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import Pokedex from "./pages/Pokedex";
import About from "./pages/About";
import PokemonShow from "./pages/PokemonShow";
import NotFound from "./pages/NotFound";
import PokemonStore from "./pages/PokemonStore";
import PokedexIndex from "./pages/PokedexIndex";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={DefaultLayout}>
                    <Route index Component={Homepage} />
                    <Route path="/pokedex" Component={Pokedex}>
                        <Route index Component={PokedexIndex} />
                        <Route path=":id" Component={PokemonShow} />
                        <Route path="store" Component={PokemonStore} />
                    </Route>
                    <Route path="/about" Component={About} />
                    <Route path="*" Component={NotFound} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
