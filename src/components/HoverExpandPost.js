import React, {useEffect, useRef, useState} from 'react';
import getDomain from "../utils/getDomain";
import isImage from "../utils/isImage";
import DescriptionIcon from '@material-ui/icons/Description';
import {motion} from "framer-motion";
import {apiAddress} from "../data/config/api";
import PostTags from "./PostTags";
import PostTitle from "./PostTitle";
import PostContent from "./PostContent";
import PostMediaIndicators from "./PostMediaIndicators";
import PostLink from "./PostLink";
import PostFooter from "./PostFooter";

const HoverExpandPost = ({post, small, lastScroll, setLastScroll}) => {
    const domain = getDomain(post.link)
    const [isSelected, setIsSelected] = useState(false)
    const myRef = useRef(null)

    useEffect(() => {
        let lastScrollCopy = new Date(lastScroll)
        lastScrollCopy.setSeconds(lastScroll.getSeconds() + 1)

        if (isSelected && !small && (!lastScroll || (new Date() > lastScrollCopy))) {
            setTimeout(() => {
                window.scroll(0, window.pageYOffset + myRef.current.getBoundingClientRect().left - myRef.current.getBoundingClientRect().width/2)
                setLastScroll(new Date())
            }, 150)
        }
    }, [isSelected])

    return (
        <motion.div
            ref={myRef}
            className={"card" + (isSelected ? " selected" : "") + (small ? " small" : "")}
            whileHover={{ width: '60vw', height: '27vw', overflowY: "scroll" }}
            onHoverStart={() => setIsSelected(true)}
            onHoverEnd={() => setIsSelected(false)}
            transition={{ type: "spring", stiffness: 50, duration: 0.1 }}

        >
            <PostTags post={post}/>
            <PostTitle post={post}/>
            {(!isSelected && !small)  &&
            <PostContent post={post}/>
            }
            {!isSelected &&
                <>
                    <PostMediaIndicators post={post} isSelected={isSelected}/>
                    <PostLink post={post} />
                    <PostFooter post={post}/>
                </>
            }

            {isSelected &&
            <>
            <div style={{marginBottom: "1.6rem"}}>{post.description}</div>

                <motion.div
                className={"card-fullcontent"}
            >
                <PostMediaIndicators post={post} isSelected={isSelected}/>
                <motion.div className={"content-container medias"}>
                    {post.medias.map((media, index) => (
                        <div key={index}>
                            {isImage(media.fileName) && (<div className={"media-image"}><img src={apiAddress + '/uploads/medias/' + media.fileName} alt=""/></div>)}
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
                <PostFooter post={post}/>
            </motion.div>
            </>
            }
        </motion.div>
    )
}

export default HoverExpandPost;