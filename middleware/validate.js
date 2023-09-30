const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'date',
    cellPhone: 'required|numeric',
    address: 'required|string',
    nationality: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveOrder = (req, res, next) => {
  const validationRule = {
    customer: 'required|string',
    brand: 'required|string',
    code: 'required|integer',
    model: 'required|string',
    color: 'required|string',
    amount: 'required|integer',
    sizes: 'required|string',
    price: 'required|numeric',
    dispatchDate: 'required|date'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {saveContact, saveOrder};