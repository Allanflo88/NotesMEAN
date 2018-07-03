//Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Database connection
mongoose.connect("mongodb://localhost/notes");

//Set port
const port = 8080;

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./routes/routes.js")(app);

app.listen(port, () => {
    console.log("We are live on " + port);
});
