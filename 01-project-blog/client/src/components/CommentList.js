import React from 'react';

const funct = ({ comments }) => {
    const renderedComments = comments.map((comment) => {
        let content;
        if (comment.status === 'approved') {
            content = comment.content;
        } 
        if (comment.status === 'pending') {
            content = "This comment is under moderation";
        }
        if (comment.status === 'rejected') {
            content = "This comment has been rejected";
        }
        
        return <li key={comment.id}>{content}</li>
    })
    
    return <>
    <em>{comments.length} Comment{comments.length === 1 || 's'}</em>
    <ul>
        {renderedComments}
    </ul></>;
}

export default funct;