import React, {useRef} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { useWheelScroll } from "../utils/use-wheel-scroll";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";
import isImage from "../utils/isImage";
import {apiAddress} from "../data/config/api";
import DescriptionIcon from "@material-ui/icons/Description";
import getDomain from "../utils/getDomain";
import { Frame, Scroll } from "framer"

const dismissDistance = 50;

const ControlledExpandPost = ({post, small = false, isSelectedProp = false, setIsSelectedProp, deport = false}) => {

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelectedProp ? 2 : 0);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelectedProp);

    function checkSwipeToDismiss(event, info) {
        if (info && info.offset && info.offset.y > dismissDistance) {
            setTimeout(() => {
                setIsSelectedProp(false)
            }, 200)
        }
    }

    function checkZIndex(latest) {
        if (isSelectedProp) {
            zIndex.set(2);
        } else if (!isSelectedProp && latest.scaleX < 1.01) {
            zIndex.set(0);
        }
    }

    const containerRef = useRef(null);

    y.set(0)

    const domain = getDomain(post.link)

    return (
        <div className={deport ? "deport" : "notdeported"}>
            <Overlay isSelected={isSelectedProp} />
            <div ref={containerRef} className={`card-content-container ${isSelectedProp && "open"}`}>
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                    style={{ zIndex, y }}
                    layout={true}
                    transition={isSelectedProp ? openSpring : closeSpring}
                    drag={isSelectedProp ? "y" : false}
                    onClick={() => {setIsSelectedProp(!isSelectedProp)}}
                    dragConstraints={constraints}
                    onDrag={(event, info) => checkSwipeToDismiss(event, info) }
                    onUpdate={checkZIndex}
                >
                    <Post small={small} post={post} isSelected={isSelectedProp}/>
                    {isSelectedProp &&
                    // <Scroll>
                    //     <Frame>
                        <div className={"card-fullcontent"}>
                            <div style={{marginBottom: "1.6rem"}}>{post.description}</div>
                            {isSelectedProp && (
                                <motion.div className={"content-container medias"}>
                            {post.medias.map((media, index) => (
                                <div key={index}>
                            {isImage(media.fileName) && (<div className={"media-image"}><img src={apiAddress + '/uploads/medias/' + media.fileName} alt=""/></div>)}
                            {!isImage(media.fileName) && (<DescriptionIcon/>)}
                                </div>
                                ))}
                                </motion.div>
                                )}
                            <>
                                <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                                    <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
                                </a>
                                <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
                            </>
                        </div>
                        // </Frame></Scroll>

                        }
                </motion.div>
            </div>
        </div>
    )
}

const Overlay = ({ isSelected, setIsSelectedProp }) => (
    <motion.div
        initial={false}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isSelected ? "auto" : "none" }}
        onClick={() => setIsSelectedProp}
        className={"overlay" + isSelected ? " open" : ""}
    >
    </motion.div>
);


export default ControlledExpandPost;