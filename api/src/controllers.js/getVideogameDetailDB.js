const { Videogame, Genre, Platform } = require("../db.js");

module.exports = async function (idNumber) {
  return (
    (await Videogame.findByPk(idNumber, {
      include: [
        //COMBINAMOS LAS 3 TABLAS
        {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Platform,
          as: "platforms",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    })) || { msg: `No se pudo encontrar el juego con el id ${id} en la BD` }
  );
};
