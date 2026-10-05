const Book = require('../../models/Book');

async function getBooks(req, res) {
    try {
        let books = await Book.find({});
        console.log(books, 'books');
        res.status(200).send({ data: books });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = {
    getBooks
};