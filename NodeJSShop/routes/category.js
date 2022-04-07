const router = require("express").Router();
const mongoose = require("mongoose");
const Category = require("../models/category");

router.get("/", async (req, res) => {
    try {
        const allCategories = await Category.find({})
        console.log("All categories are shown");
        res.send(allCategories);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;