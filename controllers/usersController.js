
module.exports = {
    login: (req, res) => {
        res.render('/users/login');
    },
    register: (req, res) => {
        res.render('/users/register');
    }
}