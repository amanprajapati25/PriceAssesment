const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8080;

const localServerList = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  };

app.use(express.json());
app.use(cors(localServerList));

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

app.use('/api', require("./router/getapiroutes.js"));

