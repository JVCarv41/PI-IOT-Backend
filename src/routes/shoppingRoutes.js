const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', (req, res, next) => {
  console.log('Create Shopping List Route');
  next();
}, shoppingController.create);

router.get('/', (req, res, next) => {
  console.log('Get All Shopping Lists Route');
  next();
}, shoppingController.getAll);

router.get('/:id', (req, res, next) => {
  console.log('Shopping List By ID Route');
  next();
}, shoppingController.getById);

router.put('/:id', (req, res, next) => {
  console.log('Update Shopping List Route');
  next();
}, shoppingController.update);

router.patch('/:id', (req, res, next) => {
  console.log('Partial Update Shopping List Route');
  next();
}, shoppingController.partialUpdate);

router.delete('/:id', (req, res, next) => {
  console.log('Remove Shopping List Route');
  next();
}, shoppingController.remove);

module.exports = router;
