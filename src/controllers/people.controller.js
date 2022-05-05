const db = require('../config/database');
const yup = require('yup');

exports.CreatePeople = async (req, res) => {
    try {
        const shema = yup.object().shape({
            name: yup.string().required(),
            age: yup.string().required(),
        });

        if (!(await shema.isValid(req.body))) {
            return res.status(400).send({
                messege: 'Invalid data',
                body: req.body
            });
        };

        const rowscount = await db.query('SELECT * FROM peoples WHERE name = $1', [req.body.name]);
        if (rowscount.rowCount > 0) {
            return res.status(400).send({
                messege: 'People already exists',
                body: req.body
            });
        }

        const { name, age } = req.body;
        const { rows } = await db.query('INSERT INTO peoples (name, age) VALUES ($1, $2) RETURNING *', [name, age]);

        res.status(200).send({
            messege: 'People created',
            body: { name, age }
        });

    } catch (error) {
        res.status(400).send({
            messege: 'Error creating people',
            error: error
        });

    };
};




exports.listAllPeople = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM peoples ORDER BY name ASC');

        res.status(200).send({
            messege: 'Peoples list',
            body: rows
        });

    } catch (error) {
        res.status(500).send({
            messege: 'Error on list peoples',
            body: error
        });
    };
};

exports.ListByID = async (req, res) => {
    try {

        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM peoples WHERE peopleid = $1', [id]);

        res.status(200).send({
            messege: 'People informated listed',
            body: rows
        });

    } catch (error) {
        res.status(500).send({
            messege: 'Error on list All peoples',
            body: error
        });
    };
};

exports.deletePeople = async (req, res) => {
    try {

        const peopleid = req.params.id;
        const { rows } = await db.query('DELETE FROM peoples WHERE peopleid = $1', [peopleid]);

        res.status(200).send({
            messege: 'People deleted',
            body: rows
        });

    } catch (error) {
        res.status(500).send({
            messege: 'Error on delete peoples',
            body: error
        });

    };
};

