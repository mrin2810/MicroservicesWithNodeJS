import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, []);
    
    const renderedComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>
    })
    
    return <>
    <em>{comments.length} Comment{comments.length == 1 || 's'}</em>
    <ul>
        {renderedComments}
    </ul></>;
}