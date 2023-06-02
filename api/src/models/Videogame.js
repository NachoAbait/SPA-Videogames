const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        //APARECE SOLO CUANDO HACEMOS EL GET{ID}
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      release_date: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      // AGREGO URL DE IMAGEN
      background_url: {
        type: DataTypes.STRING,
        validate: { isUrl: true },
      },
    },
    // EN VEZ DE CREAR UN ATRIBUTO PLATAFORMA, VOY A CERAR UNA TABLA "PLATFORM" Q SE RELACIONE CON ESATA TABLA
    {
      timestamps: false,
    }
  );
};
