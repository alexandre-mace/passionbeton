import React, {useRef, useState} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { useWheelScroll } from "../utils/use-wheel-scroll";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";

const dismissDistance = 100;

const ExpandPost = ({post, small}) => {
    const [isSelected, setIsSelected] = useState(false);

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss(event, info) {
        if (info && info.offset && info.offset.y > dismissDistance) {
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
                        onClick={() => {setIsSelected(!isSelected)}}
                        dragConstraints={constraints}
                        onDrag={(event, info) => checkSwipeToDismiss(event, info) }
                        onUpdate={checkZIndex}
                    >
                        <Post small={small} post={post}/>
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