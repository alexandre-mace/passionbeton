import React from 'react';
import MessageIcon from '@material-ui/icons/Message';

const PostCommentIndicator = ({post}) => {
    return (
        <div className={"medias-indicator"}>
            <MessageIcon fontSize={"small"}/> <div className={"ml-1"}/>
            {post.comments ? post.comments.length : 0}
        </div>
    )
}

export default PostCommentIndicator;