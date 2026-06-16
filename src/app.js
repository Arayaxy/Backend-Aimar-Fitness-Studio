const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/api/', (req, res) => {
    res.json({ message: 'Backend funcionando' })
})

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});