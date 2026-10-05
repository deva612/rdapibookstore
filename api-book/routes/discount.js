const express = require('express')
const discountController = require('../controllers/DiscountController')
const router = express.Router()

router.get('/book/for/discount', (req, res) => {
    discountController.getBooks(req, res)
})

router.post('/add/discount', (req, res) => {
    discountController.addDiscount(req, res)
})

router.get('/discount', (req, res) => {
    discountController.getDiscounts(req, res)
})

router.get('/discounts', (req, res) => {
    discountController.getDiscounts(req, res)
})
router.get('/discount/for/edit/:id',(req,res)=>{
    discountController.getDiscountForEdit(req,res)
})
router.put('/edit/discount/:id',(req,res)=>{
    discountController.editDiscount(req,res)
})

module.exports = router