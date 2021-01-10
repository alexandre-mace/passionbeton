import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";
import isImage from "../utils/isImage";
import {apiAddress} from "../data/config/api";
import DescriptionIcon from "@material-ui/icons/Description";
import getDomain from "../utils/getDomain";

const DesktopExpandPost = ({post, small}) => {
    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);
    const containerRef = useRef(null);
    const domain = getDomain(post.link)

    useEffect(() => {
        if (isSelected) {
            document.body.classList.add('overflow-hidden');
            return
        }
        document.body.classList.remove('overflow-hidden');
    }, [isSelected])

    return (
        <>
            <div ref={containerRef} className={`card-content-container ${isSelected && "open"}`}>
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                    layout={true}
                    layoutTransition={isSelected ? openSpring : closeSpring}
                    drag={isSelected ? "y" : false}
                    onClick={() => setIsSelected(!isSelected)}
                    dragConstraints={constraints}
                >
                    <Post small={small} post={post} isSelected={isSelected} setIsSelected={setIsSelected}/>
                    {isSelected &&
                    <div className={"card-fullcontent"}>
                        <div style={{marginBottom: "1.6rem"}}>{post.description}</div>
                        {isSelected && (
                            <motion.div className={"content-container medias"}>
                                {post.medias.map((media, index) => (
                                    <div key={index}>
                                        {isImage(media.fileName) && (<div className={"media-image"}><img src={apiAddress + '/uploads/medias/' + media.fileName} alt=""/></div>)}
                                        {!isImage(media.fileName) && (<DescriptionIcon/>)}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        <div className={"card-button-section"}>
                            <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                                <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
                            </a>
                            <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
                        </div>
                    </div>
                    }
                </motion.div>
            </div>
        </>
    )
}

export default DesktopExpandPost;