module.exports = {
    index: (req, res) => {
        res.sendFile(__dirname + '/src/views/index.html');
    }
}

