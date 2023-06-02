import React from "react";
import css from "./Barra.module.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import Juegos from "../Juegos/Juegos";


export default function Barra() {
    return (
        <div className={css.container}>
            <div className={css.logo}>
                <div className={css.icono}>
                    <FontAwesomeIcon className={css.font} icon={faGamepad} style={{"--fa-primary-color": "#f50000", "--fa-secondary-color": "#b5abab",}} />
                </div>
                
            </div>

            <div className={css.barra}>
                <div className={css.lista}> 
                    <ul>
                      
                        <li className={css.li}>
                            <Link to="/juegos">Videojuegos</Link>
                        </li>
                      
                    </ul>
                </div>
                
            </div>
          
        </div>
    )
}