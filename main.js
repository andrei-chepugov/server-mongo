const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const package = require('./package.json')
const users = require('./users.json');

const app = express();
const jsonParser = bodyParser.json();

let startDate = new Date;

app
    .get('/', (request, response) => {
        response.send(package.name + ' ' + package.version);
    })

    .get('/ping', (request, response) => {
        response.send('pong');
    })

    .get('/uptime', (request, response) => {
        let nowDate = new Date;
        let workTime = nowDate - startDate;
        response.send(workTime.toString());
    })


    .get('/users/:id', (request, response) => {
        function getById(id) {
            return users.find(element => element.id === id);
        };
        response.send(getById(Number(request.params.id)));
    })

    .post('/users/', (request, response) => {
        if (!request.body) return response.sendStatus(400);

        let userName = request.body.name;
        let userAge = request.body.age;
        let user = { name: userName, age: userAge };

        let readData = fs.readFileSync("users.json", "utf8");
        let users = JSON.parse(readData);


        let id = Math.max.apply(Math, users.map(function (i) {
            return i.id;
        }));

        user.id = id + 1;

        users.push(user);
        let data = JSON.stringify(users);

        fs.writeFileSync("users.json", data);
    })

    .delete('/users/:id', (request, response) => {
        let id = request.params.id;
        let readData = fs.readFileSync("users.json", "utf8");
        let users = JSON.parse(readData);
        let index = -1;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                index = i;
                break;
            }
        }

        if (index > -1) {

            let user = users.splice(index, 1)[0];
            let data = JSON.stringify(users);
            fs.writeFileSync("users.json", data);

            response.sendStatus(200);
        }
        else {
            response.sendStatus(404);
        }
    })

app.listen(3000);