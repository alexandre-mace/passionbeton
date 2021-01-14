import React from 'react';
import isImage from "../utils/isImage";
import ImageIcon from "@material-ui/icons/Image";
import DescriptionIcon from "@material-ui/icons/Description";

const PostMediaIndicators = ({post, isSelected}) => {
    return (
        <div className={"medias-indicator"}>
            {!isSelected && post.medias.map((media, index) => (
                <div key={index}>
                    {isImage(media.fileName) && (<ImageIcon/>)}
                    {!isImage(media.fileName) && (<DescriptionIcon/>)}
                </div>
            ))}
        </div>
    )
}

export default PostMediaIndicators;