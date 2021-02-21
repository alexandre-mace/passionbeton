import React, {useEffect, useRef} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../../../../utils/use-scroll-constraints";
import { openSpring, closeSpring } from "../../../../utils/cardAnimations";
import Post from "./Post";
import getDomain from "../../../../utils/getDomain";
import PostFullContent from "../../blocks/PostFullContent";

const dismissDistance = 250;
const bottomDismissDistance = 50;

const ControlledExpandPost = ({post, setExpandedPost, isExpanded}) => {
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isExpanded ? 2 : 2);
    const cardRef = useRef(null);
    const cardFullContentRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isExpanded, cardFullContentRef);

    const containerRef = useRef(null);

    y.set(0)

    const domain = getDomain(post.link)

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
                (info.offset.y > (dismissDistance - scrolledY))
                // ||
                // (scrollUnderContentSize < 0 && Math.abs(scrollUnderContentSize) > bottomDismissDistance)
            )
        )

        {
            setTimeout(() => {
                setExpandedPost(false)
            }, 50)
        }
    }

    return (
        <>
            <Overlay isSelected={isExpanded} />
            <div ref={containerRef} className={`card-content-container ${isExpanded && "open"} ${!isExpanded && "deport"}`}>
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                    style={{ zIndex, y }}
                    layout={true}
                    drag={"y"}
                    onClick={() => {setExpandedPost(false)}}
                    dragConstraints={constraints}
                    onDrag={(event, info) => checkSwipeToDismiss(event, info, cardRef) }
                >
                    <Post small={true} post={post} isSelected={isExpanded} setIsSelected={setExpandedPost}/>
                    <PostFullContent post={post} isSelected={isExpanded}/>
                </motion.div>
            </div>
        </>
    )
}

const Overlay = ({ isSelected, setExpandedPost }) => (
    <motion.div
        initial={false}
        animate={{ opacity: isSelected ? 1 : 0 }}
        style={{ pointerEvents: isSelected ? "auto" : "none" }}
        onClick={() => setExpandedPost(false)}
        className={"overlay" + isSelected ? " open" : ""}
    >
    </motion.div>
);


export default ControlledExpandPost;