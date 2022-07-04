module.exports = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    }
}

