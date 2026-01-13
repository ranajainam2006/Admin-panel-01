const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const dbConfig = require("./Config/db")
const cors = require("cors")
const session = require("cookie-session")

dbConfig()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded())
app.use('/uploads', express.static('uploads'))
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))


app.use(session({
    name: "session",
    keys: ["mykey"],
    maxAge: 60 * 60 * 1000
}));


// import routing 

const categoryRoute = require('./Routes/category.route')
const subCategoryRoute = require('./Routes/subcategory.route')
const product = require('./Routes/product.route')
const userRoute = require("./Routes/user.route")
// const user2Route = require("./Routes/user2.route")


// api routing  

app.use('/api/category', categoryRoute)
app.use('/api/subcategory', subCategoryRoute)
app.use('/api/product', product)
app.use('/api/user', userRoute)
// app.use('/api/auth/user', user2Route)



app.get("/", (req, res) => {
    res.send("Server Start");
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
}); 