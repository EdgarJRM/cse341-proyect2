const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find()
      .toArray().then((err, contacts) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const contactsId = new ObjectId(req.params.id);
    mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .find({ _id: contactsId })
      .toArray().then((err, contacts) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Contacts]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        cellPhone: req.body.cellPhone,
        address: req.body.address,
        nationality: req.body.nationality
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if(response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the user.')
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Contacts]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const contactsId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        cellPhone: req.body.cellPhone,
        address: req.body.address,
        nationality: req.body.nationality
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactsId}, contact);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the user.')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Contacts]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const contactsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactsId});
    if(response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the user.')
    }
};

module.exports = {getAll, getSingle, createUser, updateUser, deleteUser};