
module.exports = {
    login: (req, res) => {
        res.render('./users/login', { styles: "login" });
    },

    register: (req, res) => {
        res.render('./users/register',{ styles: "register" });
    }
}