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
            functions.getById(Number(request.params.id), (err, data) => {
                if (err) {
                    response.sendStatus(500);
                } else {
                    if (data) {
                        response.send(data);
                    } else {
                        response.statusCode(404);
                    };
                };
            });
        })

        .post('/users/', (request, response) => {
            if (!(request.body.name, request.body.age)) return response.sendStatus(400);
            let user = { name: request.body.name, age: request.body.age };
            functions.add(user, (err, data) => {
                if (err) {
                    response.sendStatus(500);
                } else {
                    if (data) {
                        response.send({ id: data });
                    } else {
                        response.sendStatus(404);
                    };
                };
            });
        })

        .delete('/users/:id', (request, response) => {
            functions.delById(Number(request.params.id), (err, data) => {
                if (err) {
                    response.sendStatus(500);
                } else {
                    if (Boolean(data)) {
                        response.sendStatus(200);
                    } else {
                        response.sendStatus(404);
                    };
                };
            });
        })
}