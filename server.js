'use strict';

var express = require('express');
var cors = require('cors');
const multer = require("multer");

// require and use "multer"...
const fileanalyse = require("./fileanalyse");
var app = express();

const upload = multer()

const multercfg = {
  storage: multer.memoryStorage()
}

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello',function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", upload.single("upfile"),function (req,res){
  if(req.file === undefined) return res.json("Error happend");
  const{originalname,mimetype,size} = req.file;
  res.json({name:originalname,type:mimetype,size:size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
