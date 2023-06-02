import React from "react";
import Barra from "../Barra/Barra";
import css from "./CrearJuego.module.css"

export default function AgregarJuego() {
    return (
        <div>
            <Barra></Barra>
            <div className={css.container}> 
                <h1>Hola mundo!</h1>
            </div>
        </div>
    )
}