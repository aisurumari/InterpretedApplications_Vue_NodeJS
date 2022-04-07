const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/order");

router.get("/", async (req, res) => {
    try {
        const allOrders = await Order.find({})
        console.log("All orders are shown");
        res.send(allOrders);
    } catch (err) {
        console.log(err.message);
    }
});

router.post("/", async (req, res) => {
    
    const newOrder = new Order({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    order_number: req.body.order_number
    });


    if (req.body.username == null || req.body.email == null || req.body.phone == null)
    {
        res.json('Please fill all the user data');
        return;
    }

    if (req.body.phone >= 100000000 && req.body.phone <=999999999 )
    {
        
    
    
        try{
            const savedOrder = await newOrder.save();
            res.send("Order is saved correctly");
    } catch (err) {
        console.log(err.message);
    }
}
else{
    res.json('Please write the correct phone number');
    return;
}});

router.get("/:status", async (req, res) => {
    const {status} = req.params;
    try {
        const order = await Order.find({order_state: req.params.status});
        res.send(order);
    } catch (err) {
        console.log(err.message);
    }
});

router.put("/:id/stan", async (req, res) => {
    const result = await Order.findOne({_id: req.params.id})
    if(result){
        if(req.body.order_state == "DELETED" || req.body.order_state == "REALIZED" || req.body.order_state == "ACCEPTED" )
        {
            
    
    if(result.order_state == "DELETED")
    {
        res.json('You cannot change the state of the deleted order!');
        return;
    }

    if(result.order_state == "REALIZED")
    {
        res.json('You cannot change the state back!');
        return;
    }

    if(result.order_state == "ACCEPTED" && req.body.order_state == "NOT_ACCEPTED")
    {
        res.json('You cannot change the state back!');
        return;
    }

    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            });
        res.send("Status of product was updated!");
    }   catch(err) {
        console.log(err.message);
    }
}
    
    else{
        res.send("Please give the correct name of the order state: ACCEPTED, DELETED, REALIZED");
        return;
    }}
else{
    res.send("There is no such a product!")

}});

module.exports = router;