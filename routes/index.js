const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World]
    res.send('Project 2 Part 1 (CRUD Operations)');
});

router.use('/contacts', require('./contacts'));

router.use('/orders', require('./orders'));

module.exports = router;