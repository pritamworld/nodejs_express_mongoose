const express = require("express")
const BookModel = require("../models/books")

const routes = express.Router()

//Get All Books
routes.get("/books", (req, res) => {
    // Get all books from MongoDB
    BookModel.find()
        .then((books) => {
            res.send(books)
        }).catch((err) => {
            res.status(500).send({message: err.message})
        })
    //res.send({message: "Get All Books"})
})

//Add NEW Book
routes.post("/books", async (req, res) => {
    const bookData = req.body
    console.log(bookData)
    try {
        // Create a new book instance
        const book = new BookModel(bookData)
        // Save the book to MongoDB
        const newBook = await book.save()
        res.send(newBook)
    } catch (err) {
        res.status(500).send({message: err.message})
    } 
  
    //res.send({message: "Add NEW Book"})
})

//Update existing Book By Id
routes.put("/book/:bookid", (req, res) => {

    // Update book by ID

    BookModel.findByIdAndUpdate(req.params.bookid, req.body, {new: true})
    .then((book) => {
        if(book) {
            res.send(book)
        } else {
            res.status(404).send({message: "Book not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Update existing Book By Id"})
})

//Delete Book By ID
routes.delete("/book/:bookid", (req, res) => {
    BookModel.findByIdAndDelete(req.params.bookid)
    .then((book) => {
        if(book) {
            res.send(book)
        } else {
            res.status(404).send({message: "Book not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Delete Book By ID"})
})

//Get Book By ID
routes.get("/book/:bookid", (req, res) => {
    BookModel.findById(req.params.bookid)
    .then((book) => {
        if(book) {
            res.send(book)
        } else {
            res.status(404).send({message: "Book not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get Book By ID"})
})

//Get All Books with Rating greater than 3
routes.get("/books/rating", (req, res) => {
    BookModel.find({rating: {$gt: 3}})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books with Rating greater than 3"})
})

//Get All Books with Price less than 100
routes.get("/books/price", (req, res) => {
    BookModel.find({price: {$lt: 100}})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books with Price less than 100"})
})

//Get All Books by Author
// http://localhost:3001/api/v1/books/author?author=abc
routes.get("/books/author", (req, res) => {
    BookModel.find({author: req.query.author})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books by Author"})
})

//Get All Books by Title
// http://localhost:3001/api/v1/books/title?title=xyz
routes.get("/books/title", (req, res) => {
    BookModel.find({title: req.query.title})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books by Title"})
})

//Get All Books by Price Range
// http://localhost:3001/api/v1/books/price-range?min=100&max=200
routes.get("/books/price-range", (req, res) => {
    BookModel.find({price: {$gte: req.query.min, $lte: req.query.max}})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books by Price Range"})
})

//Get All Books by Rating Range
// http://localhost:3001/api/v1/books/rating-range?min=3&max=5
routes.get("/books/rating-range", (req, res) => {
    BookModel.find({rating: {$gte: req.query.min, $lte: req.query.max}})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books by Rating Range"})
})


//Get All Books by Author and Price Range
// http://localhost:3001/api/v1/books/author-price?author=abc&min=100&max=200
routes.get("/books/author-price", (req, res) => {
    BookModel.find({author: req.query.author, price: {$gte: req.query.min, $lte: req.query.max}})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books by Author and Price Range"})
})

//Get All Books by Author1 or Author2
// http://localhost:3001/api/v1/books/authors?author1=abc&author2=xyz
routes.get("/books/authors", (req, res) => {
    BookModel.find({$or: [{author: req.query.author1}, {author: req.query.author2}]})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books by Author1 or Author2"})
})

//Get All Books in sorted order of Price (Ascending)
routes.get("/books/sort", (req, res) => {
    BookModel.find().sort({price: 1})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books in sorted order"})
})

//Get All Books in sorted order of Price (Descending)
routes.get("/books/sort-desc", (req, res) => {
    BookModel.find().sort({price: -1})
    .then((books) => {
        res.send(books)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
    //res.send({message: "Get All Books in sorted order"})
})

// Update book by ID with title and author
routes.put("/book/:bookid/title-author", async (req, res) => {
   try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.bookid, {title: req.body.title, author: req.body.author}, {new: true})
    if(updatedBook) {
        res.send(updatedBook)
    } else {
        res.status(404).send({message: "Book not found"})
    }
   } catch (error) {
       res.status(500).send({message: error.message})
   }
})


module.exports = routes