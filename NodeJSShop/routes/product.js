const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/product", async (req, res) => {
    try {
        const allProducts = await Product.find({})
        console.log("All products are shown");
        res.send(allProducts);
    } catch (err) {
        console.log(err.message);
    }
});

router.post("/addproduct", async (req, res) => {
    
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        category: req.body.category,
    });

    if (req.body.price <= 0) {
        res.status(400).json({error:true, text: 'price is too low'});
        return;
    }

    if (req.body.weight <= 0) {
        res.json('weight is too low');
        return;
    }

    if (req.body.description == null || req.body.name == null){
        res.json('There is no name or description of the product');
        return;
    }
    
        try{
            const savedProduct = await newProduct.save();
            res.send("Product is saved correctly");
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/product/:id", async (req, res) => {
    const result = await Product.findOne({_id: req.params.id})
    if(result){
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (err) {
        console.log(err.message);
    }}
    else {
        res.send("There is no such a product.");
        return;
    }
});

router.put("/products/:id", async (req, res) => {
    const result = await Product.findOne({_id: req.params.id})
    if(result){
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            });
        res.send("Product was updated!");
    }   catch(err) {
        console.log(err.message);
    }
}
    else {
        res.send("There is no such a product.");
        return;
}
});

module.exports = router;