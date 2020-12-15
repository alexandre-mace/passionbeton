import React, {useRef} from 'react';
import {motion, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { useWheelScroll } from "../utils/use-wheel-scroll";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Post from "./Post";

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
    useWheelScroll(
        containerRef,
        y,
        constraints,
        checkSwipeToDismiss,
        isSelectedProp
    );

    y.set(0)

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
                    <Post small={small} post={post}/>
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
        className="overlay"
    >
    </motion.div>
);


export default ControlledExpandPost;