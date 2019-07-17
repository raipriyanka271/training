const express = require('express')
const app = express()
const port = 4000
//const bodyParser = require('body-parser');
app.use(express.json());
// const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

//app.use(bodyParser.json());
app.get('/api/search/:title', (req, res) => {

    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

        const db = client.db('users');
        db.collection('serches').insertOne({
            title: req.params.title
        })
        db.collection('userdata').find({ $or: [{ description: { $regex: req.params.title } }, { title: { $regex: req.params.title } }] }).toArray()
            .then((docs) => {
                res.send(docs);
            })
        client.close();
    })


}
);
app.get('/api/recent/title/:item', (req, res) => {
    console.log("here")
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

        const db = client.db('users');
        db.collection('serches').insertOne({
            title: req.params.item
        })
        db.collection('userdata').find({ $or: [{ description: { $regex: req.params.item } }, { title: { $regex: req.params.item } }] }).toArray()
            .then((docs) => {
                res.send(docs);
            })
        client.close();
    })


}
);


// app.get('/api/data/recent/', (req, res) => {
//     console.log("here")

//     MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
//         const db = client.db('users');
//         db.collection('serches').find({}).toArray().then((docs)=>{console.log(docs);
//             res.send(docs)})
//         client.close();
//     })


// }
// );

app.get('/data/recent', (req, res) => {
    let feed = [];
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

        const db = client.db('users');
        db.collection('serches').find({}).toArray().then((docs) => {
            feed = JSON.stringify(docs);

        }, (err) => {          
            }).then(() => {
                res.send(feed);
            });
        client.close();
    });
 });


// app.get('/data/recent', (req, res) => {
//     console.log("here")
//     MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
//         if (err) console.log('Connection error', err)
//         const db = client.db('users');
//         db.collection('serches').find({}).toArray((err, data)
//             .then(res.send(JSON.stringify(data))))
//             if (err) console.log(err);
//     })
//     client.close();
// })


app.get('/api', (req, res) => {

    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

        const db = client.db('users');
        db.collection('userdata').find({}).toArray((err, data) => {
            res.send(data);

        })
        client.close();
    })


}
);





app.listen(port)