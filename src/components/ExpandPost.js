import React, {useRef, useState} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { useWheelScroll } from "../utils/use-wheel-scroll";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";
import isImage from "../utils/isImage";
import {apiAddress} from "../data/config/api";
import DescriptionIcon from "@material-ui/icons/Description";
import getDomain from "../utils/getDomain";

const dismissDistance = 250;
const bottomDismissDistance = 50

const ExpandPost = ({post, small}) => {
    const [isSelected, setIsSelected] = useState(false);

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss(event, info, cardRef) {
        let scrolledY = 0
        if (cardRef['current'].style.transform.split(',')[1]) {
            scrolledY =  cardRef['current'].style.transform.split(',')[1].replace('px', '')
        }
        const element = cardRef.current;
        const viewportHeight = window.innerHeight;
        const contentHeight = element.offsetHeight;
        const contentOversize = contentHeight - viewportHeight;

        const scrollUnderContentSize =  contentOversize + parseInt(scrolledY);
        if (
            info &&
            info.offset &&
            (
                (info.offset.y > (dismissDistance - scrolledY)) ||
                (scrollUnderContentSize < 0 && Math.abs(scrollUnderContentSize) > bottomDismissDistance)
            )
        ) {
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
    useWheelScroll(
        containerRef,
        y,
        constraints,
        checkSwipeToDismiss,
        isSelected
    );

    y.set(0)
    const domain = getDomain(post.link)

    return (
            <>
                <Overlay isSelected={isSelected} />
                <div ref={containerRef} className={`card-content-container ${isSelected && "open"}`}>
                    <motion.div
                        ref={cardRef}
                        className={"card-content"}
                        // style={{ ...inverted, zIndex, y }}
                        layout={true}
                        layoutTransition={isSelected ? openSpring : closeSpring}
                        drag={isSelected ? "y" : false}
                        onClick={() => setIsSelected(!isSelected)}
                        dragConstraints={constraints}
                        onDrag={(event, info) => checkSwipeToDismiss(event, info, cardRef) }
                        onUpdate={checkZIndex}
                    >
                        <Post small={small} post={post} isSelected={isSelected}/>
                        {isSelected &&
                        // <Scroll>
                        //     <Frame>
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
                            // </Frame></Scroll>

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


export default ExpandPost;