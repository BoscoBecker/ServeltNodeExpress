const db = require('../config/database');
const yup = require('yup');

exports.CreateProduct = async (req, res) => {
    try {

        const { product_name, quantity, price } = req.body;
        const shema = yup.object().shape({
            product_name: yup.string().required(),
            quantity: yup.number().required(),
            price: yup.number().required()
        });


        if (!(await shema.isValid(req.body))) {
            return res.status(400).send({
                messege: 'Invalid data',
                body: req.body
            });
        }

        const { rows } = await db.query('INSERT INTO products (productname, quantity, price)' +
            'VALUES ($1, $2, $3) RETURNING *',
            [product_name, quantity, price]);

        res.status(200).send({
            messege: 'Product created',
            body: { product_name, quantity, price }
        });
    } catch (error) {


        res.status(400).send({
            messege: 'Error creating product',
            error: error
        });
    };
};

exports.listAllProduct = async (req, res) => {
    try {

        const { rows } = await db.query('SELECT * FROM products ORDER BY productname ASC');
        res.status(200).send({
            messege: 'Product list',
            body: rows
        });


    } catch (error) {
        res.status(500).send({
            messege: 'Error on list product',
            body: error
        });

    };
};

exports.ListByID = async (res) => {
    try {

        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM products WHERE productid = $1', [id]);
        res.status(200).send({
            messege: 'Product list',
            body: rows
        });
        TRY
    } catch (error) {

        res.status(500).send({
            messege: 'Error on list product',
            body: error
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {


        const productid = req.params.id;
        const { rows } = await db.query('DELETE FROM products WHERE productid = $1', [productid]);
        res.status(200).send({
            messege: 'Product deleted',
            body: { productid }
        });

    } catch (error) {

        res.status(500).send({
            messege: 'Error on delete product',
            body: error
        });
    }
}