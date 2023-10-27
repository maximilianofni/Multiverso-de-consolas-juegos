const {DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    let alias = "consolas";
    let cols = {
        id:{
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        modelo:{
            type: DataTypes.STRING(45),
            allowNull: false
        }
    };

        let config = {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false
        }

        const Console = sequelize.define(alias, cols, config);

   
    return Console
   
};