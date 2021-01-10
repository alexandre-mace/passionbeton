import React, {useEffect, useRef, useState} from 'react';
import {Chip} from "@material-ui/core";
import getTagColor from "../domain/getTagColor";
import getDomain from "../utils/getDomain";
import ImageIcon from '@material-ui/icons/Image';
import isImage from "../utils/isImage";
import DescriptionIcon from '@material-ui/icons/Description';
import {motion} from "framer-motion";
import {apiAddress} from "../data/config/api";

const HoverExpandPost = ({post, small}) => {
    const domain = getDomain(post.link)
    const [isSelected, setIsSelected] = useState(false)
    const [lastScroll, setLastScroll] = useState(new Date())
    const myRef = useRef(null)

    useEffect(() => {
        let lastScrollCopy = new Date(lastScroll)
        lastScrollCopy.setSeconds(lastScroll.getSeconds() + 1.5)

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
            whileHover={{ width: '60vw', height: '27vw', overflow: "scroll" }}
            onHoverStart={() => setIsSelected(true)}
            onHoverEnd={() => setIsSelected(false)}
            transition={{ type: "spring", stiffness: 50, duration: 0.1 }}

        >
            <div className={"post-header"}
            >
                <div style={{fontSize: '1rem', marginBottom: '0.5rem'}} className={"bold"}>{post.author}</div>
                <div className={"post-date"}>{post.createdAt}</div>
            </div>
            <div className={"post-tags"} style={{marginBottom: '1rem'}}
            >
                {(post.tags !== null) && post.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        style={{marginRight: '0.5rem', marginBottom: '0.3rem', borderColor: getTagColor(tag), color: getTagColor(tag)}}
                        variant="outlined"
                        size={"small"}
                        label={tag}
                    />
                ))}
            </div>
            {(!isSelected && !small) &&
            <div style={{marginBottom: "1.6rem"}}
            >{post.description.substring(0, (isSelected ? 125 : 130))}{post.description.length > 125 && '...' }</div>
            }
            <div className={"medias-indicator"}>
                {!isSelected && post.medias.map((media, index) => (
                    <div key={index}>
                        {isImage(media.fileName) && (<ImageIcon/>)}
                        {!isImage(media.fileName) && (<DescriptionIcon/>)}
                    </div>
                ))}
            </div>
            {!isSelected &&
            <>
                <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                    <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
                </a>
                <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
            </>
            }
            {isSelected &&
            <motion.div
                className={"card-fullcontent"}
            >
                <div style={{marginBottom: "1.6rem"}}>{post.description}</div>
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
            </motion.div>
            }
        </motion.div>
    )
}

export default HoverExpandPost;