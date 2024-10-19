import React from 'react';

export default ({ comments }) => {
    const renderedComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>
    })
    
    return <>
    <em>{comments.length} Comment{comments.length == 1 || 's'}</em>
    <ul>
        {renderedComments}
    </ul></>;
}