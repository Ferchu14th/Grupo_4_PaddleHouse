const db = require('../../database/models');
const sequelize = db.sequelize;

const usersApiController = {
    list: (req, res) => {
        db.Users.findAll()
            .then(users => {
                let respuesta = {
                    count: {
                        status: 200,
                        total: users.length,
                        url: "/api/users"
                    },
                    users: users.map(user => {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: "/images/avatars/" + user.avatar,
                            isAdmin: user.isAdmin,
                            detail: "/api/users/" + user.id
                        }
                    })
                }
                res.json(respuesta)
            })
    },

    detail: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.id.length,
                        url: "/api/users/" + user.id
                    },
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: "/images/avatars/" + user.avatar,
                    }
                }
                res.json(respuesta)
            })
    }

}

module.exports = usersApiController;