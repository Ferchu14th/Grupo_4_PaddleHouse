module.exports = (sequelize, dataTypes) =>{
    let alias = 'Products';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(100),
        description: dataTypes.TEXT,
        image: dataTypes.STRING(100),
        price: dataTypes.MEDIUMINT,
        discount: dataTypes.TINYINT,
        inventory_id: dataTypes.BIGINT(10),
    };
    let options = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias,cols,options);

      Product.associate = function(models){

        Product.belongsTo(models.Inventory,{
            as:'inventories',
            foreignKey:'inventory_id'
        })
    
        

    }

    return Product;

}




