const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const ObjectId = require('mongodb').MongoClient
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlvdh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority"`

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 5055


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err =>{
    
    // all collection are here.....
    const blogPost = client.db("RetroBlog").collection("BlogPost");



    // post blog from here .....
    app.post('/post-blog', (req, res) =>{
        const postedBlog = req.body
        blogPost.insertOne(postedBlog)
        .then(res =>{
            console.log(res.insertedCount)
            res.send(res.insertedCount > 0)
        })
    })

    // get blog from here .....
    app.get('/blogs', (req, res) =>{
        blogPost.find()
        .toArray((err, items) =>{
            res.send(items)
        })
    })

    // edit data from here .....


    // delete data from  here .....
    
});



app.get('/', function(req, res) {
    res.send('Server is ready to work with us')
})

app.listen(process.env.PORT || port, ()=>{
    console.log("Server Ready")
})