const { Videogame, Genre, Platform } = require("../db.js");
const { Op } = require("sequelize");

module.exports = async function (name) {
  const results = await Videogame.findAll({
    //BUSCAMOS COINCIDENCIAS X SUBSTRING CON CASE INSENSITIVE
    where: name
      ? {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        }
      : {},

    // FIJAMOS LOS ATRIBUTOS Q NOS INTERESA TRAER
    attributes: ["id", "name", "background_url", "rating"],

    //INCLUIMOS LA TABLE DE GENEROS
    include: {
      model: Genre,
      as: "genres",
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });

  // MAPEAMOS LOS JUEGOS ENCONTRADOS PARA AGREGARLES A
  // CADA UNO EL "DB" DISTINTIVO EN EL ID
  // Y CONVERTIMOS EL RATING EN UN NUMERO
  return results.map((game) => {
    return {
      ...game.dataValues,
      id: "DB" + game.id,
      rating: game.rating * 1,
    };
  });
};
