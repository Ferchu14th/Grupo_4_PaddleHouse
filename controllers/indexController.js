const path = require("path");
const fs = require("fs");

module.exports = {
  intro: (req, res) => {
    res.render(path.join(__dirname, "../views/intro"));
  },
  index: (req, res) => {
    res.render("index", {
      styles: "styles",
      user: req.session.user,
    });
  },
};
