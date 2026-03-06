require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/db_connection-mongo');  

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

getConnection();

app.listen(PORT, () => {
    console.log(`🟢 Servidor escuchando en el puerto ${PORT}`);
});