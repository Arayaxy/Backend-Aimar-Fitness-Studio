const express = require('express');
const cors = require('cors');
require('dotenv').config();


const clasesRutas = require('./routes/clases.route.js')
const authRutas = require('./routes/auth.route.js')
const reservas = require('./routes/reservas.route.js')

const app = express();
const port = process.env.PORT || 3000;

const whiteList = [
    ' http://localhost:3000/'
]
app.use(cors({
    origin: whiteList
}))

app.use(express.json())

app.use('/api', clasesRutas)
app.use('/api', authRutas)
app.use('/api', reservas)

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
