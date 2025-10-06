const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose = require("mongoose")
const PASSWORD = "password"
// const DB_CONNECTION_STRING = "mongodb://localhost:27017/books"
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://sa:zXRcenjBrPmpXLx3@cluster0.7wn4nmp.mongodb.net/week06_lab?retryWrites=true&w=majority&appName=Cluster0"
const SERVER_PORT = process.env.SERVER_PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.get('/sonar', (req, res) => {
    return res.status(200).json({ 
      nome:  'Learn SonarQube code coverage',
      status: true 
    });
});

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
    app.listen(SERVER_PORT, () =>{
        console.log(`Server running at http://localhost:${SERVER_PORT}/`)
    })
}).catch((err) => {
    console.log("Error: ", err)
})