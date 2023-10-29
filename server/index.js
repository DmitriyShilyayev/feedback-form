const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const app = express();

const port = 9090;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/registration', upload.array(), (req, res) => {
    if (Math.random() > 0.5) {
        let errorResponse = {
                status: 'error',
                fields: {},
            },
            keys = Object.keys(req.body);
        for (
            let i = 0;
            i <= Math.floor(Math.random() * (keys.length - 1));
            i++
        ) {
            let fieldKey = keys[Math.floor(Math.random() * (keys.length - 1))];
            errorResponse.fields[
                fieldKey
            ] = `Какая-то ошибка в поле ${fieldKey}`;
        }

        res.statusCode = 400;
        setTimeout(() => {
            res.send(errorResponse);
        }, Math.random() * 1000);
    } else {
        setTimeout(() => {
            res.statusCode = 200;
            res.send({
                status: 'success',
                msg: 'Ваша заявка успешно отправлена',
            });
        }, Math.random() * 1000);
    }
});

app.get('/api/ping', (req, res) => {
    res.statusCode = 200;
    res.send({
        status: 'success',
        message: 'Server is ready',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
