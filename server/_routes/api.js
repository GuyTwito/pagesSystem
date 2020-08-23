const express = require("express");
const router = express.Router();

const flickr = require('./flickr');

router.get("/", (req, res) => {
    res.send("<h1>Welcome to PageSystem API !</h1>")
});

router.use('/flickr', flickr);

module.exports = router;