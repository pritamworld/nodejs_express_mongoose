const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose = require("mongoose")
const PASSWORD = "password"
// const DB_CONNECTION_STRING = "mongodb://localhost:27017/books"
const DB_CONNECTION_STRING = "mongodb+srv://sa:wG0O7vewunLGyYrO@cluster0.7wn4nmp.mongodb.net/week06_lab?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

const app = express()

const SERVER_PORT = 3001

app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})