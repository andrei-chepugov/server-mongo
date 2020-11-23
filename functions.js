const fs = require('fs');

function getById(id, cb) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            try {
                let users = JSON.parse(data);
                cb(null, users.find(element => element.id === id));
            } catch (error) {
                cb(error, null);
            }
        };
    });
};

function add(user, cb) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            let users = JSON.parse(data);
            let id;
            cb(null, id = Math.max.apply(Math, users.map(function (i) {
                return i.id;
            })));
            if (id > -1) {
                user.id = id + 1;
                users.push(user);
                fs.writeFile("users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        cb(err);
                    };
                })
            };
        };
    });
};

function delById(id, cb) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            let users = JSON.parse(data);
            let index;
            cb(null, index = users.findIndex(element => element.id === id));
            if (index > -1) {
                users.splice(index, 1)[0];
                fs.writeFile("users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        cb(err);
                    };
                });
            };
        };
    });

};

exports.getById = getById;
module.exports.add = add;
module.exports.delById = delById;