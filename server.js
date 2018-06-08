var express=require('express');
var app=express();

var mongojs = require('mongojs')
var db = mongojs('datas', ['datas']);


var bodyParser=require('body-parser');
//using vanila node
// app.get('/',function(req,res){
//     res.send('server running')
// })

//using express,pages are served starting from public folder's index.html file
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());


app.get('/getData',function(req,res){
    console.log("result from db");

    db.datas.find(function(err,datas){
        console.log("response",datas);
        res.json(datas);
        
    })

    app.post('/saveData',function(req,res){
        console.log("requested body",req.body);
        //var multiplicationData=req.body.
        db.datas.insert(req.body,function(err,doc){
            res.json(doc);
        })
        
    })



//dummy data to test the UI behaviour 
            // first_multiplication = {
            //     first_number: 22,
            //     second_number: 33,
            //     result: 726

            // };
            // second_multiplication = {
            //     first_number: 21,
            //     second_number: 7,
            //     result: 147
            // };
            // var datas = [first_multiplication, second_multiplication];
            // res.json(datas);
            


});



app.listen(3300,function(){
    console.log("server up at port 3300");
})