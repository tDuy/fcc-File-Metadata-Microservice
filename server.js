// server.js

// init project 
var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({limits: {fileSize: 1024*10, files: 1}}).single('file');

app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if(err){
      res.status(500).send(err.toString());
      return;
    }
  
    var buffer = new Buffer(req.file.buffer);
    res.send({ size: buffer.byteLength });
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
