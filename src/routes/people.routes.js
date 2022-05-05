const router = require('express-promise-router')();
const peopleController = require('../controllers/people.controller');


router.post('/peoples', peopleController.CreatePeople);
router.get('/peoples', peopleController.listAllPeople);
router.get('/peoples/:id', peopleController.ListByID);
router.delete('/peoples/:id', peopleController.deletePeople);

module.exports = router;