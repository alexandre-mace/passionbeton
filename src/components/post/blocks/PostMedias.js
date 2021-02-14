import React from 'react';
import {motion} from "framer-motion";
import isImage from "../../../utils/isImage";
import {apiAddress} from "../../../data/config/api";
import DescriptionIcon from "@material-ui/icons/Description";

const PostMedias = ({post}) => {
    return (
        <motion.div className={"content-container medias"}>
            {post.medias.map((media, index) => (
                <div key={index}>
                    {isImage(media.fileName) && (
                        <div className={"media-image"}>
                            <img src={apiAddress + '/uploads/medias/' + media.fileName} alt=""/>
                        </div>
                    )}
                    {!isImage(media.fileName) && (<DescriptionIcon/>)}
                </div>
            ))}
        </motion.div>
    )
}

export default PostMedias;