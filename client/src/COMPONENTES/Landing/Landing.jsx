import React from "react";
import css from "../Landing/Landing.module.css"
import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div className={css.container}>
            <div className={css.contenido}>
                <h4>
                Bienvenidos a <span>Epic Edge</span>
            </h4>
            <h1>
                La web de los juegos
                </h1>
                <Link to="/juegos">
                    <button className={css.btn}>Inicio</button>
                </Link>
            
            </div>
            
        </div>
    )
}