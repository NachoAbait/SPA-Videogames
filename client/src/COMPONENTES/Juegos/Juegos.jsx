import React, { useEffect , useState } from "react";
import { useDispatch , useSelector} from "react-redux";

import Card from "../Card/Card";
import Barra from "../Barra/Barra";
import css from "../Juegos/Juegos.module.css"
import { getGenres } from "../../REDUX/ACTIONS/getGenres";
import { getJuegos } from "../../REDUX/ACTIONS/getJuegos";
import { getJuegoByName } from "../../REDUX/ACTIONS/getJuegoByName";
import { Orden } from "../../REDUX/ACTIONS/Orden"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { } from "@fortawesome/free-brands-svg-icons"
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons"
import { filterGenre } from "../../REDUX/ACTIONS/filterGenre";

export default function Juegos() {
    const dispatch = useDispatch()

    const [selectedGenre, setSelectedGenre] = useState("");
    const [nombreJuego, setNombre] = useState("")
    const [orden, setOrden] = useState("")

    const AllJuegos = useSelector((state) => state.juegos)
    const genres = useSelector((state) => state.genres )
    

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getJuegos())
    }, [dispatch])


    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        dispatch(filterGenre(genre))
    };
    
    const handleOrden = (e) => {
        e.preventDefault();
        setOrden(e.target.value)
        dispatch(Orden(e.target.value))
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        setNombre(inputValue);
        dispatch(getJuegoByName(inputValue));
      }
      
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getJuegos())
        setOrden("")
        setNombre("")
        setSelectedGenre("")

    }

    return (
        <div>
            <Barra></Barra>
              <div className={css.menu}>
                        <div className={css.searchbar}>
                            <div className={css.search2}>
                                <button onClick={(e) => handleClick(e)} className={css.boton}>
                                    Reset
                                </button>
                        </div>
                            <div className={css.search1}>
                                <form className={css.form}>
                                    <input type="text" placeholder="Buscar juego..." value={nombreJuego} className={css.busqueda} onChange={(e) => handleInputChange(e)} /> 
                                </form>
                            </div>
                        </div>

                        <div className={css.categorias}>
                            {genres.map((e) => {
                                return (
                                    <div className={`${css.genero} ${selectedGenre === e.name ? css.selected : ""}`} onClick={() => handleGenreClick(e.name)}>
                                        {e.name}
                                    </div>
                                )
                            })}
                        </div>

                        <div className={css.orden}>
                            <label for="orden"><FontAwesomeIcon icon={faArrowDownWideShort} style={{color: "#ffffff",}} /></label>
                            <select id="orden" className={css.select} value={orden} onChange={ e => handleOrden(e)}>
                                <option value="">Elije una opcion</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
            </div>
            
            {AllJuegos.length ?  
                <div className={css.container}>
                  
                    <div className={css.juegos}>
                        {AllJuegos.map((e) =>
                            <Card nombre={e.name} rating={e.rating} genres={e.genres} img={e.background_image} id={e.id}></Card>
                    )}
                    </div>
                
                </div> : <iframe src="https://embed.lottiefiles.com/animation/143548" className={css.cargando} title="a"></iframe>}
            
        
        </div>
    )
}