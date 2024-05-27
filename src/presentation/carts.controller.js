const express = require('express')
const router = express.Router();


router.get('/hello', (req, res) => {
    res.send('List of products');
});

router.get('/:id', (req, res) => {
    res.send(`Details of product with id ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Create a new product');
});

module.exports = router