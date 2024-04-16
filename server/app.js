const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

app.use('/api', require("./router/getapiroutes.js"));

