const express = require("express")
const BookModel = require("../models/Books")

const routes = express.Router()

//Get All Books
routes.get("/books", async (req, res) => {
    //res.send({message: "Get All Books"})

    try {
        const books = await BookModel.find()
        res.status(200).send(books)
    } catch (error) {
        res.status(500).send({message: "No Books Found"})
    }
})

/*
    {
        "book_name": "Let us C",
        "author": "Pritesh",
        "price": 100.00
    }
*/
//Add NEW Book
routes.post("/books", async(req, res) => {
    //res.send({message: "Add NEW Book"})

    const newBook = new BookModel(req.body)

    try {
        await newBook.save()
        res.status(201).send(newBook)
    } catch (error) {
        res.status(500).send({message: "Error while inserting new book"})
    }

})

//Update existing Book By Id
routes.patch("/book/:bookid", async (req, res) => {
    //res.send({message: "Update existing Book By Id"})
    try {
        console.log(req.body)
        const updatedBook = await BookModel.findByIdAndUpdate(req.params.bookid, req.body)
        //console.log(updatedBook)
        const nb = await updatedBook.save()
        res.status(202).send(nb)
      } catch (err) {
        res.status(500).send(err)
      }
})

//Delete Book By ID
routes.delete("/book/:bookid", async (req, res) => {
    //res.send({message: "Delete Book By ID"})
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id)
    
        if (!book) { 
            res.status(404).send("No item found")
        }
        res.status(200).send(book)
      } catch (err) {
        res.status(500).send(err)
      }
})

//Get Book By ID
routes.get("/book/:bookid", (req, res) => {
    res.send({message: "Get Book By ID"})
})

//Get All Books in sorted order
routes.get("/books/sort", (req, res) => {
    res.send({message: "Get All Books in sorted order"})
})

module.exports = routes