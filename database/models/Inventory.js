module.exports = (sequelize, dataTypes) =>{
    let alias = 'Inventory';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(50),
        qty: dataTypes.INTEGER(10),
        warehouse: dataTypes.STRING(50),
    };
    let options = {
        tableName: 'inventory',
        timestamps: false
    };

    const Inventory = sequelize.define(alias,cols,options);

    Inventory.associate = function(models){

        Inventory.hasMany(models.Products,{
            as:'products',
            foreignKey: 'inventory_id'
        })

    }
    return Inventory;

}