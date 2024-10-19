const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const event = req.body;

    //series of POST requests
    await axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.msg);
    });
    await axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.msg);
    });
    console.log(event);
    await axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.msg);
    });
    
    res.send({ status: 'OK'});
})

app.listen(4005, () => {
    console.log('Listenig on 4005');
})