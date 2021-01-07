import React, {useRef, useState} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";
import isImage from "../utils/isImage";
import {apiAddress} from "../data/config/api";
import DescriptionIcon from "@material-ui/icons/Description";
import getDomain from "../utils/getDomain";

const DesktopExpandPost = ({post, small}) => {
    const [isSelected, setIsSelected] = useState(false);

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);

    function checkSwipeToDismiss(event, info, cardRef) {
        if (true) {
            setTimeout(() => {
                setIsSelected(false)
            }, 200)
        }
    }

    function checkZIndex(latest) {
        if (isSelected) {
            zIndex.set(2);
        } else if (!isSelected && latest.scaleX < 1.01) {
            zIndex.set(0);
        }
    }
    const containerRef = useRef(null);

    y.set(0)
    const domain = getDomain(post.link)

    return (
        <>
            <Overlay isSelected={isSelected} />
            <div ref={containerRef} className={`card-content-container ${isSelected && "open"}`}>
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                    layout={true}
                    layoutTransition={isSelected ? openSpring : closeSpring}
                    onClick={() => {if (!isSelected) {setIsSelected(true)}}}
                    onUpdate={checkZIndex}
                >
                    <Post post={post} isSelected={isSelected} setIsSelected={setIsSelected}/>
                    {isSelected &&
                    <motion.div
                        className={"card-fullcontent"}
                    >
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
                    </motion.div>
                    }
                </motion.div>
            </div>
        </>
    )
}

const Overlay = ({ isSelected, setIsSelected }) => (
    <motion.div
        initial={false}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isSelected ? "auto" : "none" }}
        onClick={() => setIsSelected}
        className="overlay"
    >
    </motion.div>
);


export default DesktopExpandPost;