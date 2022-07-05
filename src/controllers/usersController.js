
module.exports = {
    login: (req, res) => {
        res.render('../views/login.html');
    },
    register: (req, res) => {
        res.render('../views/register.html');
    }
}