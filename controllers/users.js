const { rejects } = require('assert');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

let connect = null;

let getConnect = function () {
    if (connect) {
        return connect.catch(function () {
            return connect = MongoClient.connect(url);
        })
    } else {
        return connect = MongoClient.connect(url);
    };
};

function getById(id) {
    return getConnect()
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('documents');
            return collection.findOne({ _id: { $eq: id } });
        });
};

function add(user) {
    return getConnect()
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('documents');
            return collection.insertOne(user);
        });
};

function delById(id) {
    return getConnect()
        .then((client) => {
            const db = client.db(dbName);
            const collection = db.collection('documents');
            return collection.deleteOne({ _id: { $eq: id } });
        });
};

exports.getById = getById;
module.exports.add = add;
module.exports.delById = delById;