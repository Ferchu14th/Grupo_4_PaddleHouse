module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: dataTypes.STRING(50),
        email: dataTypes.STRING(50),
        password: dataTypes.STRING(50),
        avatar: dataTypes.STRING(100),
        isAdmin: dataTypes.BOOLEAN
    };
    let options = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias,cols,options);
    return User;

}
