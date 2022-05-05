const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send({
            sucess: 'true',
            message: 'Your are logged',
            version: '1.0.0'
    });

});

module.exports = router;