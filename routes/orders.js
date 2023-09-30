const express = require ('express');
const router = express.Router();

const contactsController = require('../controllers/orders');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get ('/:id', contactsController.getSingle);

router.post('/', validation.saveOrder, contactsController.createOrder);

router.put('/:id', validation.saveOrder, contactsController.updateOrder);

router.delete('/:id', contactsController.deleteOrder);

module.exports = router;