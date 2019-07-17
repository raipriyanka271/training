const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
// const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

app.get('/api/:idx', (req, res) => {

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

    const db = client.db('users');
    db.collection('userdata').find({id: req.params.idx}).toArray((err,data) => {
        res.send(data);
        
    })
    client.close();
})


}
);  
app.post('/data',function(req,res){
//    var id=req.body.id;
//     var title=req.body.title;
//     var description=req.body.description;
//     var imageUrl=req.body.imageUrl;
//     var cost=req.body.cost;
    console.log(req.body);
    var myobj = { id:req.body.id,
                 title: req.body.title,
                description :req.body.description ,
                imageUrl:req.body.imageUrl,
                cost:req.body.cost
            };
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
    const db = client.db('users');
    db.collection("userdata").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
       
      });
      client.close();
    });



  });  
    
    
    


app.listen(port)