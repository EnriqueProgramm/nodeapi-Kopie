const express = require('express');
const app = express();
const mongoose = require('mongoose');
const  PostRoutes =  require('./routes/post');
const  AuthRoutes =  require('./routes/auth');
const UserRoutes = require("./routes/user");
const fs = require('fs');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require('express-validator');
const dotenv = require("dotenv");
const cors = require('cors');
// apiDocs

app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) =>{
    if(err){
      res.status(400).json({
        error:err
      })
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});



dotenv.config();

//connect db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("DB connected"))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.mesage}`)
})

 //bring in routes
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", PostRoutes);
app.use("/", AuthRoutes);
app.use("/", UserRoutes);



app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized!"});
    }
  });



const port = process.env.PORT || 8000;
app.listen(port, () => {console.log( `is listening the port: ${port}`)});


