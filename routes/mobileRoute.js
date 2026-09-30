const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
const BookController = require('../controllers/bookController');
const mobileController = require('../controllers/mobileController')
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
    extended: false
}))
route.post('/add/mobile', (req, res) => {
    mobileController.addMobile(req, res);
})

module.exports = route;