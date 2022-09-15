module.exports = {
    index: (req, res) => {
        res.render("index", {
            styles: "styles",
            user: req.session.user,
        });
    },
};
