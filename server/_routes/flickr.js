const express = require("express");
const router = express.Router();

const { validations, errorHandling } = require('../_utils')
const { flickr } = require('../_logic')

const search = async (req, res, next, page, search_query = "") => {
    try {
        let validate_param = validations.validate("int", page, "page")
        if (validate_param !== null)
            next(errorHandling.statusObject(412, validate_param))

        let answer = await flickr.search_images(search_query, page)
        if (answer.status === 200)
            res.json(answer.message)
        else
            next(errorHandling.statusObject(answer.status, answer.message))
    }
    catch (err) {
        next(errorHandling.statusObject(500, err))
    }
}


router.get("/search_images/:page/:search_query", async (req, res, next) => {
    try {
        const { page, search_query } = req.params
        search(req, res, next, page, search_query)
    } catch (err) {
        next(errorHandling.statusObject(500, err))
    }
});

router.get("/search_images/:page", async (req, res, next) => {
    try {
        const { page } = req.params
        search(req, res, next, page)
    } catch (err) {
        next(errorHandling.statusObject(500, err))
    }
});

module.exports = router;