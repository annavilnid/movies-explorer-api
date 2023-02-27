# Movies Explorer
Репозиторий для API Movies Explorer - сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете. Проект был реализован в рамках дипломной работы на платформе Яндекс.Практикум.

**Стек технологий:**
* JavaScript; 
* NodeJS; 
* Express.js; 
* MongoDB;  
* Postman. 

**Фукционал:**
* Все роуты, кроме аутентификации и авторизации, защищены авторизацией.
* Настроено логгирование (запросы и ответы записываются в request.log, ошибки записываются в error.log).
* Данные, которые приходят в теле и параметрах запроса, валидируются.
* Ошибки обрабатываются централизованным обработчиком.
* Для ошибок API созданы классы, расширяющие конструктор Error.
* Реализовано бережное хранение пароля (пароль хранится в виде хеша, API не возвращает хеш пароля клиенту).

**API:**
* Создание пользователя с переданными в теле email, password и name.
  <pre><span class="pl-c1">POST/signup</span></pre>
* Проверка переданных в теле почты и пароля и возвращение JWT
  <pre><span class="pl-c1">POST/signin</span></pre>
* Получение информации о пользователе (email и имя)
  <pre><span class="pl-c1">GET/users/me</span></pre>
* Обновление информации о пользователе (email и имя)
  <pre><span class="pl-c1">PATCH/users/me</span></pre>
* Получение всех фильмов, сохранённых текущим пользователем
  <pre><span class="pl-c1">GET/movies</span></pre>
* Создание фильма с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
  <pre><span class="pl-c1">POST/movies</span></pre>
* Удаление сохранённого фильма по id
  <pre><span class="pl-c1">DELETE/movies/_id</span></pre>

**Как установить и запустить проект:**
* Клонировать репозиторий:
    <pre><span class="pl-c1">git clone https://github.com/annavilnid/movies-explorer-api.git</span></pre>
* Установить зависимости:
    <pre><span class="pl-c1">npm install</span></pre>
* Собрать проект Вебпаком:
    <pre><span class="pl-c1">npm run build</span></pre>
* Запустить проект на локальном сервере:
    <pre><span class="pl-c1">npm run dev</span></pre>

**Сейчас сервер выключен, когда сервер включен проект доступен:**
* SERVER LINK: https://api.vilnid.nomoredomains.sbs <br/>
* PUBLIC IP: 84.201.178.236 <br/>
* SERVER: api.vilnid.nomoredomains.sbs <br/>
* vilnid.nomoredomains.sbs(пока не работает, тут будет фронт)
