const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Of the forms id: [comment1, comment2, ...]
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id: commentId,
        content,
        status: 'pending'
    });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            status: 'pending',
            postId: req.params.id
        }
    }).catch(err => {
        console.log(err.message);
    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    console.log('Event Recieved', type);
    if (type === 'CommentModerated') {
        const {id, postId, status, content} = data;
        const comments = commentsByPostId[postId] || [];

        const comment = comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id, 
                status, 
                postId, 
                content
            }
        }).catch(err => {console.log(err.message)});
    }

    res.send({});
})

app.listen(4001, async () => {
    console.log('Listening on Port 4001');
});