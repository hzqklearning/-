var express = require('express');
var app = express();

var port = 8888;

app.get('/aa',function(req,res){
    res.send('aaaaaaa');
});

app.get('/study',function(req,res){
    res.sendFile(__dirname+'/pages/study.html')
});

app.use('/pages',express.static('pages'))

var server = app.listen(port,function () {
    var host = server.address().host;
    var port = server.address().port;
    console.log('应用实例: '+host+':'+port);
});