const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');
const { NOT_FOUND_CODE } = require('./errrors/errors');

mongoose.connect('mongodb://127.0.0.1/moviesdb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата

app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use((req, res, next) => {
  req.user = {
    _id: '63078ac40f70cb528c85118e',
  };
  next();
});

app.use('/users', userRouter);
app.use('/movies', moviesRouter);

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая страница или URL не найдены' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
