import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import getDomain from "../../../utils/getDomain";
import PostMedias from "./PostMedias";
import Comments from "../../comment/Comments";

const PostFullContent = ({post, isSelected, withFooter = false}) => {
    const domain = getDomain(post.link)
    const [animating, setAnimating] = useState(isSelected);
    useEffect(() => {
        if (animating) {
            setTimeout(() => {
                setAnimating(false)
            }, 400)
        }
    }, [isSelected])

    return (
        <>
            <motion.div className={"card-fullcontent" +
            (animating ? ' card-content-invisible': ' card-content-visible')
            }>
                <div className={"post-content"} style={{marginBottom: "1.6rem"}}>{post.description}</div>
                <PostMedias post={post}/>
                <div className={"card-button-section"}>
                    <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                        <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
                    </a>
                    <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
                </div>
            </motion.div>
            {isSelected &&
                <div className={
                    (animating ? ' card-content-invisible': ' card-content-visible')
                }>
                    <Comments post={post}/>
                </div>
            }
        </>

    )
}

export default PostFullContent;