import React from 'react';
import {motion} from "framer-motion";
import PostMediaIndicators from "./PostMediaIndicators";
import isImage from "../../utils/isImage";
import {apiAddress} from "../../data/config/api";
import DescriptionIcon from "@material-ui/icons/Description";
import PostFooter from "./PostFooter";
import getDomain from "../../utils/getDomain";

const PostFullContent = ({post, isSelected, withFooter = false}) => {
    const domain = getDomain(post.link)

    return (
        <>
            <motion.div className={"card-fullcontent"}>
                <div className={"post-content"} style={{marginBottom: "1.6rem"}}>{post.description}</div>
                <PostMediaIndicators post={post} isSelected={isSelected}/>
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
                <div className={"card-button-section"}>
                    <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                        <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
                    </a>
                    <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
                </div>
                {withFooter &&
                    <PostFooter post={post}/>
                }
            </motion.div>
        </>
    )
}

export default PostFullContent;