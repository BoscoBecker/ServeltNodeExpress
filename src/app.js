
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const index = require('./routes/index');
const productRoute = require('./routes/product.routes');
const propleRoute = require('./routes/people.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));

app.use(cors());
app.use(helmet());

app.use(cors({ origin: 'http://localhost:3000' }));
app.disable('x-powered-by');
app.set('trust proxy', '127.0.0.1');

app.use(index);
app.use('/api/', productRoute);
app.use('/api/', propleRoute);

module.exports = app;