const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');
const { errorHandler } = require('./middelewares/errorHandler');
const limiter = require('./middelewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middelewares/logger');

mongoose.connect('mongodb://127.0.0.1/bitfilmsdb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(cors({
  origin: [
    'https://api.vilnid.nomoredomains.sbs',
    'http://api.vilnid.nomoredomains.sbs',
    'https://vilnid.nomoredomains.sbs',
    'http://vilnid.nomoredomains.sbs',
    'http://localhost:3000',
  ],
}));

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// логгер запросов
app.use(requestLogger);
app.use(limiter);

app.use(routes);

// логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate для Joi
app.use(errors());

// обработчик кастомных ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
