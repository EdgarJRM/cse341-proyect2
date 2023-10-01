const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
      .getDatabase()
      .db()
      .collection('orders')
      .find()
      .toArray().then((err, orders) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
    });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid order id to find an order.');
    }
    const ordersId = new ObjectId(req.params.id);
    mongodb
      .getDatabase()
      .db()
      .collection('orders')
      .find({ _id: ordersId })
      .toArray().then((err, orders) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders[0]);
    });
};

const createOrder = async (req, res) => {
    //#swagger.tags = ['Orders]
    const orders = {
        customer: req.body.customer,
        brand: req.body.brand,
        code: req.body.code,
        model: req.body.model,
        color: req.body.color,
        quantity: req.body.quantity,
        sizes: req.body.sizes,
        price: req.body.price,
        dispatchDate: req.body.dispatchDate
    };
    const response = await mongodb.getDatabase().db().collection('orders').insertOne(orders);
    if(response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the order.')
    }
};

const updateOrder = async (req, res) => {
    //#swagger.tags = ['Orders]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid order id to update an order.');
    }
    const ordersId = new ObjectId(req.params.id);
    const orders = {
        customer: req.body.customer,
        brand: req.body.brand,
        code: req.body.code,
        model: req.body.model,
        color: req.body.color,
        quantity: req.body.quantity,
        sizes: req.body.sizes,
        price: req.body.price,
        dispatchDate: req.body.dispatchDate
    };
    const response = await mongodb.getDatabase().db().collection('orders').replaceOne({ _id: ordersId}, orders);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the order.')
    }
};

const deleteOrder = async (req, res) => {
    //#swagger.tags = ['Orders]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid order id to delete an order.');
    }
    const ordersId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('orders').deleteOne({ _id: ordersId});
    if(response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the order.')
    }
};

module.exports = {getAll, getSingle, createOrder, updateOrder, deleteOrder};