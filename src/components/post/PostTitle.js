import React from 'react';

const PostTitle = ({post}) => {
    return (
        <div className={"post-title"} style={{fontSize: '1rem', marginBottom: '1.2rem', fontWeight: 500}}>
            {post.title === null ? 'Nouveau partage' : post.title}
        </div>
    )
}

export default PostTitle;