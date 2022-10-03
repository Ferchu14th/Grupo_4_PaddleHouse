module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: dataTypes.STRING(100),
        brand: dataTypes.STRING(100),
        description: dataTypes.TEXT,
        image: dataTypes.STRING(100),
        price: dataTypes.MEDIUMINT,
        model: dataTypes.STRING(100),
        inventory_id: dataTypes.BIGINT(10),
    };
    let options = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, options);

    Product.associate = function (models) {

        Product.belongsTo(models.Inventory, {
            as: 'inventories',
            foreignKey: 'inventory_id'
        })



    }

    return Product;

}




