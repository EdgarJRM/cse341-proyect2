const express = require ('express');
const router = express.Router();


const contactsController = require('../controllers/orders');
const validation = require('../middleware/validate');
const { isAuthenticated} = require('../middleware/authenticate');

router.get('/', contactsController.getAll);

router.get ('/:id', contactsController.getSingle);

router.post('/', isAuthenticated, validation.saveOrder, contactsController.createOrder);

router.put('/:id', isAuthenticated, validation.saveOrder, contactsController.updateOrder);

router.delete('/:id', isAuthenticated, contactsController.deleteOrder);

module.exports = router;