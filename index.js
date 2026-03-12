require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/db_connection-mongo');  

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/generos', require('./routes/genero'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/medias', require('./routes/media'));
app.use('/api/productores', require('./routes/productor'));
app.use('/api/tipos', require('./routes/tipo'));

getConnection();

app.listen(PORT, () => {
    console.log(`🟢 Servidor escuchando en el puerto ${PORT}`);
});