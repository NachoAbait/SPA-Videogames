import React, { useEffect , useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetalle } from "../../REDUX/ACTIONS/getDetalle";
import Barra from "../Barra/Barra"
import css from "./Detalles.module.css"
import { limpiarDetalle } from "../../REDUX/ACTIONS/limpiarDetalle";

export default function Detalles() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const detalle = useSelector((state) => state.detalle);

  const datosRef = useRef(null);
  const extraRef = useRef(null);

  useEffect(() => {
    dispatch(limpiarDetalle()); // Limpiar el estado detalle antes de hacer la nueva solicitud
    dispatch(getDetalle(id)); // Obtener los detalles del nuevo juego
  }, [dispatch, id]);

  useEffect(() => {
    const altura = window.innerHeight / 1.3;

    function handleScroll() {
      const distancia = datosRef.current.getBoundingClientRect().top;

      if (distancia <= altura) {
        datosRef.current.classList.add(css.aparece);
      } else {
        datosRef.current.classList.remove(css.aparece);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const altura = window.innerHeight / 1.3;

    function handleScroll() {
      const distancia = extraRef.current.getBoundingClientRect().top;

      if (distancia <= altura) {
        extraRef.current.classList.add(css.aparece);
      } else {
        extraRef.current.classList.remove(css.aparece);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mostrar un indicador de carga mientras se espera la respuesta
  if (!detalle) {
    return <iframe src="https://embed.lottiefiles.com/animation/143548" className={css.cargando}></iframe>;
  }

  // Mostrar los detalles del juego una vez que se obtenga la respuesta
  const backgroundImageStyle = {
    backgroundImage: `url(${detalle.background_image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

    return (
      <div className={css.container}>
        <Barra></Barra>
        <div className={css.principal} style={backgroundImageStyle}>
                
        </div>
            <div className={css.datos} > 
                
                <div className={css.resumen} ref={datosRef}>
                    <h1>Resumen</h1>
                    <p>{detalle.description?.replace(/<[^>]+>/g, "")}</p>
                </div>
                <div className={css.extras} ref={extraRef} >
                    <h1>Lanzamiento</h1>
                    <p>{detalle.released}</p>
                    <h1>Plataformas</h1>
                    <p>{detalle.parent_platforms?.map((e) => {return e.platform.name + " | " })}</p>
                    <h1>Generos</h1>
                    <p>{detalle.genres?.map((e) => { return e.name + "  |  " })}</p>
                    <h1>Website</h1>
                    <p><a target="blank" href={detalle.website}>{detalle.website}</a></p>
                </div>
             
            </div>
      </div>
    );
  }
  