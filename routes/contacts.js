const express = require ('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get ('/:id', contactsController.getSingle);

router.post('/', validation.saveContact, contactsController.createUser);

router.put('/:id', validation.saveContact, contactsController.updateUser);

router.delete('/:id', contactsController.deleteUser);

module.exports = router;