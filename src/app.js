const express = require('express');
require('dotenv').config();

const clasesRutas = require('./routes/clases.route.js')
const authRutas = require('./routes/auth.route.js')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/api', clasesRutas )
app.use('/api', authRutas)

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
