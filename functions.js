function getById(id) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        return JSON.parse(data);
    });
    return users.find(element => element.id === id);
};

function add(user, cb) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        return JSON.parse(data);
    });
    let id = Math.max.apply(Math, users.map(function (i) {
        return i.id;
    }));
    if (id > -1) {
        user.id = id + 1;
        users.push(user);
        fs.writeFile("users.json", JSON.stringify(users), (err) => { });
        return cb(id);
    } else {
        return cb()
    };
};

function delById(id, cb) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        return JSON.parse(data);
    });
    const index = users.findIndex(element => element.id === id);
    if (index > -1) {
        users.splice(index, 1)[0];
        fs.writeFile("users.json", JSON.stringify(users), (err) => { });
        const ok = true;
        return cb(ok);
    } else {
        return cb();
    }
};

exports.getById = getById;