const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


const handleEvent = async (type, data) => {
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch(err => {
            console.log(err.message);
        });
    }
}

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    await handleEvent(type, data);
    res.send({});
});

app.listen(4003, async () => {
    console.log("Listening on PORT 4003");
    try {
        const res = await axios.get("http://localhost:4005/events").catch(err => {
            console.log(err.message);
        });;
    
        for (let event of res.data) {
        console.log("Processing event:", event.type);
    
        handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
})