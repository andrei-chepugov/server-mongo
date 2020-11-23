const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const { name, version } = require('./package.json')
const users = require('./users.json');
const functions = require('./functions.js');

const app = express();
const jsonParser = bodyParser.json();

const startDate = new Date;

app.use(jsonParser);

app

    .get('/', (request, response) => {
        response.send({ name, version });
    })

    .get('/ping', (request, response) => {
        response.send('pong');
    })

    .get('/uptime', (request, response) => {
        response.send((new Date - startDate).toString());
    })


    .get('/users/:id', (request, response) => {
        response.send(getById(Number(request.params.id)));
    })

    .post('/users/', (request, response) => {
        if (!(request.body.name, request.body.age)) return response.sendStatus(400);
        let userName = request.body.name;
        let userAge = request.body.age;
        let user = { name: userName, age: userAge };
        add(user, (id) => id ? response.send(user) : response.sendStatus(404));
    })

    .delete('/users/:id', (request, response) => {
        let id = Number(request.params.id);
        delById(id, (ok) => ok ? response.sendStatus(200) : response.sendStatus(404));
    })

const PORT = 3000;

app.listen(PORT, () => console.info(`Server started on http://localhost:${PORT}`));