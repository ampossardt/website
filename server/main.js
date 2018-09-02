require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');

const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN,
    domain: 'mail.andrewpossardt.com'
});

const corsOptions = {
    origin: process.env.CORS_ENV,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());

app.post('/mail', (req, res) => {
    var body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);

        mailgun.messages().send(data, (error, body) => {
            if(error) {
                res.sendStatus(401);
            } else {
                res.sendStatus(200);
            }
        });
    });
});

app.get('health', (req, res) => {
    res.sendStatus(200);
});

const port = process.env.PORT || 8081

app.listen(port, () => {});