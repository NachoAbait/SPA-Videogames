const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "platform",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    // EN VEZ DE CREAR UN ATRIBUTO PLATAFORMA, VOY A CERAR UNA TABLA "PLATFORM" Q SE RELACIONE CON ESATA TABLA
    {
      timestamps: false,
    }
  );
};
