const express = require('express');
const bodyParser = require('body-parser');
const routing = require('./routing/index.js').default;
const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser)
routing(app);

const PORT = 3000;

app.listen(PORT, () => console.info(`Server started on http://localhost:${PORT}`));