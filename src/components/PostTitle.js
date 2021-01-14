import React from 'react';

const PostTitle = ({post}) => {
    return (
        <div style={{fontSize: '1.1rem', marginBottom: '1.2rem'}} className={"bold"}>{post.title === null ? 'Nouveau partage' : post.title}</div>
    )
}

export default PostTitle;