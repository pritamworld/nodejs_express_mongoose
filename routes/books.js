const express = require("express")
const mongoose = require("mongoose")

const BookModel = require("../models/Books")

const routes = express.Router()

//Get All Books
routes.get("/books", async (req, res) => {
    //res.send({message: "Get All Books"})

    try {
        const books = await BookModel.find()
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send(error)
    }
   

})

/*
    {
        "title": "Let Us C",
        "author": "Pritesh",
        "price": 10.75,
        "published_date" : "10-12-2022"
    }
*/
//Add NEW Book
routes.post("/books", async (req, res) => {
    //res.send({message: "Add NEW Book"})

    try {
        const newBook = new BookModel(req.body)
        const book = await newBook.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Update existing Book By Id
routes.patch("/book/:bookid", async(req, res) => {
    //res.send({message: "Update existing Book By Id"})

    try {
        const newBook = await BookModel.findByIdAndUpdate(req.params.bookid, req.body)
        //const book = await newBook.save()
        res.status(201).send(newBook)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete Book By ID
routes.delete("/book/:bookid", async(req, res) => {
    //res.send({message: "Delete Book By ID"})
    try {
        const deletedBook = await BookModel.findByIdAndDelete(req.params.bookid)
        if(!deletedBook){
            res.status(400).send({message: "No Book to Delete"})
        }
        res.status(201).send(deletedBook)
    } catch (error) {
        res.status(400).send(error)
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