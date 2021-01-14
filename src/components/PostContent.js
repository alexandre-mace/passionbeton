import React from 'react';

const PostContent = ({post}) => {
    return (
        <div style={{marginBottom: "1.6rem", color: '#b8b8b8'}}
        >{post.description.substring(0, 130)}{post.description.length > 125 && '...' }</div>
    )
}

export default PostContent;