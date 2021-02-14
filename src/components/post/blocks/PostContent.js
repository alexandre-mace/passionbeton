import React from 'react';

const PostContent = ({post}) => {
    return (
        <div className={"post-content"} style={{marginBottom: "1.6rem"}}
        >{post.description.substring(0, 130)}{post.description.length > 125 && '...' }</div>
    )
}

export default PostContent;