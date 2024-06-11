const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendEmail = require('./emailSender');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/sendEmail', (req, res) => {
    const emailData = req.body;

    sendEmail(emailData)
        .then(() => res.status(200).send('Correo enviado exitosamente'))
        .catch((error) => res.status(500).send(`Error al enviar el correo: ${error.message}`));
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
