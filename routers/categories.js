const {Category} = require('../models/category');
const express = require('express');
const {Product} = require("../models/product");
const router = express.Router();


// Tüm kategorileri getiriyor
router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(404).json({msg: 'Category not found!', success: false});
    }
    res.status(200).send(categoryList)
})

// Id ye göre 1 kategori getirme

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404).json({msg: 'Category not found!', success: false});
    }
    res.status(200).send(category);
})


// router.post('/', async (req, res) => {
//     let category = new Category({
//         name: req.body.name,
//         icon: req.body.icon,
//         color: req.body.color,
//     });
//     category = await category.save();
//     if (!category) res.status(404).json({msg: 'Category cannot be created!', success: false});
//     res.send(category);
// })

// ChatGPT Optimised
// Yeni kategori ekleme
router.post('/', async (req, res) => {
    try {
        const category = await new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        }).save();

        if (!category) {
            return res.status(500).json({msg: 'Category cannot be created!', success: false});
        }

        res.send(category);
    } catch (err) {
        res.status(500).json({msg: 'An error occurred while creating the category!', success: false});
    }
});

// ID ye göre update işlemi
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        }, {new: true});
    if (!category) {
        res.status(404).json({msg: 'Product not found!', success: false});
    }
    res.status(200).send(category);
})

// Id ye göre kategori silme
router.delete(`/:id`, (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({msg: 'Category removed!', success: true});
            } else {
                return res.status(404).json({msg: 'Category not found!', success: false});
            }
        })
        .catch((err) => {
            res.status(400).json({msg: err.message, success: false});
        })
})

module.exports = router;
