import React from 'react';
import ImageIcon from "@material-ui/icons/Image";

const PostMediaIndicators = ({post}) => {
    return (
        <div className={"medias-indicator"}>
            <ImageIcon fontSize={"small"}/> <div className={"ml-1"}/> {post.medias.length}
        </div>
    )
}

export default PostMediaIndicators;