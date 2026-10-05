const Book  = require('../models/Book')
const Discount = require('../models/Discount')
async function getBooks(req,res) { 
    try {
        // select _id, bookTitle from Bokk=> in my sql
        let books = await Book.find({},{_id: 1, bookTittle: 1, bookTitle: 1 }) //in mongodb
        console.log(books,'books');
        
        res.status(200).send({data: books})

    } catch (err) { 
        
        res.status(400).send({message : "something went wrong"})

    }

}
async function addDiscount(req,res){
    try {
        console.log(req.body);
        const discount = new Discount(req.body)
        await discount.save()
        res.status(200).send({message: 'Discount Added'})
        
    } catch (err) {
        
         res.status(400).send({message: 'Something went Wrong'})
    }
}
async function getDiscounts(req,res) {
    try { 
        let discounts = await Discount.find({}).populate('book');
         console.log(discounts)
        res.status(200).send({data: discounts })
        
    } catch (err) {
        
        res.status(400).send({message: 'some  thing went wrong'})
        
    }
    
}
async function getDiscountForEdit(req,res){
    try {
        let id = req.params.id;
        let discount = await Discount.findOne({_id: id});
        let books = await Book.find({});
        console.log(discount);
        res.status(200).send({ data: discount ,books: books})

    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Something went Wrong........." })
    }
}

async function editDiscount(req, res) {
    try {
        let id = req.params.id;
        let discount = await Discount.updateOne({_id: id},req.body);
        console.log(discount);
        
        console.log("successfully........");
        res.status(200).send({ message: 'Data Inserted Successfully......'})
        // let books = await Book.find({});

        

    } catch (err) {

        console.log(err);

        res.status(400).send({
            message: "Something went wrong"
        });
    }
}


module.exports ={
    getBooks,
    addDiscount,
    getDiscounts,
    getDiscountForEdit,
    editDiscount
}