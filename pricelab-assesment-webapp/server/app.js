const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server is running");
})

const items = [
    {
        name: 'Cloth',
        id: '1',
        price: '20'
    },
    {
        name: 'Food',
        id: '2',
        price: '50'
    },
    {
        name: 'House',
        id: '3',
        price: '150'
    }
]

app.get('/api/items', (req,res) => {
    res.send(items)
});