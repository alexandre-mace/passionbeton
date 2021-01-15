import React from 'react';

const PostFooter = ({post}) => {
    return (
        <div className={"post-footer"} style={{fontSize: '0.9rem'}}
        >
            <div style={{color: '#b8b8b8'}}>{post.author}</div>
            <div className={"post-date"} style={{color: '#b8b8b8'}}>{post.createdAt}</div>
        </div>
    )
}

export default PostFooter;