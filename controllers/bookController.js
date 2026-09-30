const Book = require('../models/Book');
const cloudinary = require('cloudinary').v2
const addBook = async (req, res) => {
    try {
        cloudinary.config({
            cloud_name: "lkpuvdaj",
            api_key: "859446541939459",
            api_secret: "SjmK-UtLyV68HUDAXJmZm0FsP1Q"
        })
        const upload= await cloudinary.uploader.upload(req.file.path)
        console.log(upload);
        req.body.bookImage = upload.secure_url;
        let book = new Book(req.body);
        await book.save();
        console.log('data saved successfully');
        res.status(200).send({ message: 'data saved successfully' });
    } catch (err) {
        res.status(400).send({ message: 'somenthing went wrong' });
    }
}

async function getBooks(req, res){
    try {
        const searchRegex = new RegExp(req.query.searchBook || "", "i");
        const bookFilter = {
            $or: [
                { bookTittle: searchRegex },
                { bookTitle: searchRegex }
            ]
        };
        let totalBooks = await Book.countDocuments(bookFilter);
        console.log(totalBooks, 'totalbooks');
        let books = await Book.find(bookFilter).skip((req.query.pageNo-1) * (req.query.booksPerPage)).limit(req.query.booksPerPage);
        res.status(200).send({ data: books, totalBooks: totalBooks })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err });

    }
}
async function deleteBook(req,res){
    try {
        id = req.params.id;
        await Book.deleteOne({_id: id});
        res.status(200).send({ success: true})
    } catch (err) {
        
        res.status(400).send({ success: false})
    }
}
async function getBookForEdit(req,res) {
    try {
        let id = req.params.id;
        
        let book =await Book.findOne({ _id: id });
        
        res.status(200).send({ data: book })
    } catch (err) {
        
        res.status(400).send({ data: err })
    }
    
}

async function editBook(req,res){
    try {
        let id = req.params.id;
        console.log(id)
        let book = req.body;
        
        await Book.updateOne({ _id: id}, req.body)
        
        res.status(200).send({ success: true})
    } catch(err){
        
        res.status(400).send({ success: false})
    }
}
async function getBookById(req, res) {
    try {
        let id = req.params.id;

        

        let book = await Book.findOne({ _id: id });

        if (!book) {
            return res.status(404).send({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).send({
            success: true,
            data: book
        });

    } catch (err) {
        

        res.status(400).send({
            success: false,
            message: err.message
        });
    }
}
module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    getBookById,
    editBook
}