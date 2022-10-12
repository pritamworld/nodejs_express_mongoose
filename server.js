const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose = require("mongoose")

const app = express()

const SERVER_PORT = 3001

app.use(express.json())
app.use(express.urlencoded())

mongoose.connect("mongodb+srv://sa:rlRFbMwWVXDNWMpt@cluster0.7wn4nmp.mongodb.net/gbc_full_Stack?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use("/api/v1/", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})