const express = require('express');
const router = express.Router();

const {Product} = require("../models/product");
const {Category} = require("../models/category");


// Http Requests
// tüm productları getir
router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) res.status(500).json({msg: 'Product not found!', success: false});

    res.send(productList);
});

//id ye göre product getir

router.get('/:id', async (req, res) => {
    const productById = await Product.findById(req.params.id);
    if (!productById) {
        res.status(404).json({msg: 'Product not found!', success: false});
    }
    res.status(200).send(productById);
})

// yeni product ekleme
router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) res.status(404).json({msg: 'Invalid Category ! ', success: false});

    const product = await new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    product.save();

    if (!product) return res.status(404).json({msg: 'Product cannot be created!', success: false});

    return res.status(200).send(product);
});

// Id ye göre product update

router.put(`/:id`, async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured

        },{new: true}
    ).then(product => {
        if (!product) return res.status(404).json({msg: 'Product not found!', success: false});
        return res.status(200).send(product);

    }).catch(err => res.status(400).json({msg: err.message, success: false}));
})


// product delete
router.delete(`/:id`, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (product) res.status(200).json({msg: 'Product deleted successfully!', success: true});
            else res.status(404).json({msg: 'Product cannot be found !', success: false});
        })
        .catch((err) => {
            res.status(400).json({msg: err.message, success: false});
        })


})

module.exports = router;
