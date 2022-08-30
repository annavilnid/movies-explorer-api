const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');
const { errorHandler } = require('./middelewares/errorHandler');
const { requestLogger, errorLogger } = require('./middelewares/logger');
const limiter = require('./middelewares/rateLimiter');

const { NODE_ENV, DB_PROD_ADDRESS } = process.env;
const { PORT, DB_DEV_ADDRESS, ALLOWED_DOMAINS } = require('./constants/constants');

mongoose.connect(NODE_ENV === 'production' ? DB_PROD_ADDRESS : DB_DEV_ADDRESS, {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());

app.use(cors({
  origin: ALLOWED_DOMAINS,
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
