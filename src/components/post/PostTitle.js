import React from 'react';

const PostTitle = ({post}) => {
    return (
        <div className={"post-title"} style={{marginBottom: '0.8rem'}}>
            {post.title === null ? 'Nouveau partage' : post.title}
        </div>
    )
}

export default PostTitle;