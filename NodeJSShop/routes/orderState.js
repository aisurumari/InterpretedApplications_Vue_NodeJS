const router = require("express").Router();
const mongoose = require("mongoose");
const State = require("../models/order_state");

router.get("/", async (req, res) => {
    try {
        const allStates = await State.find({})
        console.log("All states are shown");
        res.send(allStates);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;