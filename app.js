const express = require("express");
const bodyParser = require("body-parser");
const router = require('./src/router.js');

const app = express();
const HTTP_PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

/*
## Коментарии от код-ревьюера ##

- поле 'date' нужно хранить в формате DATE что бы в дальнешем легче было делать дополнительные запросы.
Например получить все новости за определенный промежуток времени.
Можно добавить допольнительное поле 'updated' что бы знать когда новость была отредактированна

- Используйте множественное число для названия своих REST сервисов. Подробнее можно почитать [тут](https://habr.com/ru/post/351890/)  
Как должно быть  
`GET /api/articles`  
`GET /api/articles/:id`  
`POST /api/articles`  
`PUT /api/articles/:id`  
`DELETE /api/articles/:id`  

- При ошибке в запросе статус кода должен быть 400.  
"HTTP 400 Bad Request" - указывает, что сервер не смог понять запрос из-за недействительного синтаксиса  
"HTTP 403 Forbidden" - "Запрещено". У клиента нет прав доступа к содержимому, поэтому сервер отказывается дать надлежащий ответ. 

- Если отправить GET, PUT, DELETE запросы в по id которая не существует. Например id = 20, 
Запрос должен вернуть ошибку – например, 404 Not Found.
Можно также передать бессмысленные id (буквы, слова, символы), и вообще их не передать.
Все эти запросы должны возвращать соответствующие ошибки. 

- Нет валидации данных злоумышлиники могут использовать sql иньекции/.  
Наример get запрос /api/article/1 UNION sELECT * FROM article where id =5;
[Здесь](https://www.youtube.com/watch?v=ciNHn38EyRc) отличное видео про sql injection, [тут](https://habr.com/ru/post/130826/) статья которая будет полезна.

- Создать отдельные папки для routers и database. Хранить отдельные файлы для каждого роутера.
Cтурктура папок будет выглядить
```sh
/routes  
    articles.js
/database  
    database.js
```

- Использовать [nodemon](https://www.npmjs.com/package/nodemon), что бы изменения вступали всилу сразу после редактирования кода без перезагрузки сервера. 
*/