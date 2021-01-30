import React, {useRef, useState} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { useWheelScroll } from "../utils/use-wheel-scroll";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";
import PostFullContent from "./post/PostFullContent";

const dismissDistance = 250;
const bottomDismissDistance = 50

const ExpandPost = ({post, small}) => {
    const [isSelected, setIsSelected] = useState(false);

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss(event, info, cardRef) {
        if (!cardRef) return

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
                        <Post small={small} post={post} isSelected={isSelected} setIsSelected={setIsSelected}/>
                        {isSelected &&
                            <PostFullContent post={post} isSelected={isSelected}/>
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