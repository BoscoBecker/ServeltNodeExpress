const router = require('express-promise-router')();
const produtoController = require('../controllers/product.controller');

router.post('/products', produtoController.CreateProduct);
router.get('/products', produtoController.listAllProduct);
router.get('/products/:id', produtoController.ListByID);
router.delete('/products/:id', produtoController.deleteProduct);

module.exports = router;