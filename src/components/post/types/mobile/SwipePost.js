import React from 'react';
import {motion, useMotionValue, useTransform} from "framer-motion";
import Post from "./Post";

const SwipePost = ({post, setExpandedPost, small = false, ...props}) => {

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    return (
        <motion.div
            style={{
                position: "absolute",
                top: 0,
                x: x,
                rotate: rotate,
                cursor: "grab",
                borderRadius: "16px",
                boxShadow: props.index === 4 - props.indicatorIndex ? '0 20px 40px 0 rgb(41 41 211 / 55%)' : 'none'
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={props.drag}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }}
            onDragEnd={() => {}}
            initial={props.initial}
            animate={{
                top: props.index === 4 - props.indicatorIndex ? 0 : 35,
                scale: props.index === 4 - props.indicatorIndex ? 1 : 0.9,
                transition: { duration: 0.2 }
            }}
            transition={props.transition}
            exit={{
                x: props.exitX,
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 }
            }}
        >
            <div className={`card-content-container`} onClick={() => {setExpandedPost(post)}}>
                <motion.div className={"card-content"}>
                    <Post small={small} post={post} setIsSelected={setExpandedPost}/>
                </motion.div>
            </div>
        </motion.div>
    )
};

export default SwipePost;