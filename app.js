const express = require('express');
const { getDb, connectToDb } = require('./db');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

let db;
connectToDb((err) => {
    if(!err){
        app.listen('3000', ()=>{
            console.log('app listening on port 3000');
        })
        db = getDb();
    }
})

app.get('/books', (req,res) => {
    let books = [];

    db.collection('books')
        .find()
        .sort({author:1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch(() => {
            res.status(500).json({error: 'Error............................'});
        })
})

app.get('/books/:id', (req,res) => {
    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .findOne({id: new ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err =>{
                res.status(500).json({error:'coult not fetch the doc'});
            })
    } else {
        res.status(500).json({error:'could not fetch the document'});
    }
})