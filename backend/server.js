require('dotenv').config()

//all imported libraries
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const _ = require("lodash")
// const  multer = require('multer');
// const upload = multer();
const fileUpload = require("express-fileupload")
const storageStuff = require('./storagestuff')

//Port number the server runs off of
const PORT = 8080


//Server: construct an express webserver based on the specifications
//        that are required (all this is handled in the class)
// class Server{

//    constructor(){
app = express()

// all imported libraries that the server takes advantage of
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"))

app.get('/',function(req,res){
   res.status(200).send("Hello World, the server is up and running")
})

app.post('/upload', async function(req, res){
    await storageStuff.upload_file(req, res)
})

app.listen(PORT,function(){
   console.log("Server is running on port: " + PORT)
})