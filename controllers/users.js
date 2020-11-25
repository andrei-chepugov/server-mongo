const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '654065'
});

function getById(id, cb) {
    connection.query(
        'SELECT * FROM users.users WHERE id=?', [id], (err, results) => {
            if (err) {
                cb(err, null);
            } else {
                try {
                    cb(null, results);
                } catch (error) {
                    cb(error, null);
                };
            };
        }
    );
};

function add(user, cb) {
    connection.query(
        'INSERT INTO users.users(name, age) VALUES(?, ?)', [user.name, user.age], (err, results) => {
            if (err) {
                cb(err, null);
            } else {
                try {
                    cb(null, results.insertId);
                } catch (error) {
                    cb(error, null);
                };
            };
        }
    );
};

function delById(id, cb) {
    connection.query(
        'DELETE FROM users.users WHERE id=?', [id], (err, results) => {
            if (err) {
                cb(err, null);
            } else {
                try {
                    cb(null, results.affectedRows);
                } catch (error) {
                    cb(error, null);
                };
            };
        }
    );

};

exports.getById = getById;
module.exports.add = add;
module.exports.delById = delById;