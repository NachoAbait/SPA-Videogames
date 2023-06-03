import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
///////////////////////////////////////////////////**/ */
import Juegos from "./COMPONENTES/Juegos/Juegos";
import CrearJuego from "./COMPONENTES/Crear juego/CrearJuego";
import Landing from "./COMPONENTES/Landing/Landing";
/*//////////////////////////////////////////////////// */
import axios from "axios";
import Detalles from "./COMPONENTES/Detalles/Detalles";

axios.defaults.baseURL = "https://spa-videogames-production.up.railway.app/";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing></Landing>} />
          <Route exact path="/juegos" element={<Juegos></Juegos>} />
          <Route
            exact
            path="/agregar-juego"
            element={<CrearJuego></CrearJuego>}
          />
          <Route
            exact
            path="juegos/:id"
            element={<Detalles></Detalles>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
