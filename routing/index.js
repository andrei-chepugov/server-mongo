const { name, version } = require('../package.json')
const functions = require('../controllers/users.js');
const getById = functions.getById;
const add = functions.getById;
const delById = functions.delById;

const startDate = new Date;

module.exports.default = (app) => {

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
            functions.getById(Number(request.params.id))
                .then(
                    function (result) {
                        if (result) {
                            response.send(result);
                        } else {
                            response.sendStatus(404);
                        }
                    },
                    function (err) {
                        response.sendStatus(500);
                    }
                );
        })

        .post('/users/', (request, response) => {
            if (!(request.body.name, request.body.age)) return response.sendStatus(400);
            const ID = Math.ceil(Math.random() * 1000);
            let user = { _id: ID, name: request.body.name, age: request.body.age };
            functions.add(user)
                .then(
                    function (result) {
                        if (result) {
                            response.send(result.ops);
                        } else {
                            response.sendStatus(404);
                        }
                    },
                    function (err) {
                        response.sendStatus(500);
                    }
                );
        })

        .delete('/users/:id', (request, response) => {
            functions.delById(Number(request.params.id))
                .then(
                    function (result) {
                        if (Boolean(result.deletedCount)) {
                            response.sendStatus(200);
                        } else {
                            response.sendStatus(404);
                        }
                    },
                    function (err) {
                        response.sendStatus(500);
                    }
                );
        })
}