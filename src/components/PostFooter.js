import React from 'react';

const PostFooter = ({post}) => {
    return (
        <div className={"post-footer"} style={{fontSize: '0.9rem'}}
        >
            <div>{post.author}</div>
            <div className={"post-date"} style={{color: '#989898'}}>{post.createdAt}</div>
        </div>
    )
}

export default PostFooter;