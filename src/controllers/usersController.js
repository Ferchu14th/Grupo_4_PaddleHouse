module.exports = {
    login: (req, res) => {
        res.sendFile(__dirname + '/src/views/login.html');
    },
    register: (req, res) => {
        res.sendFile(__dirname + '/src/views/register.html');
    }
}