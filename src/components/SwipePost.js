import React, {useState} from 'react';
import {motion, useMotionValue, useTransform} from "framer-motion";
import Post from "./Post";
import ControlledExpandPost from "./ControlledExpandPost";

const SwipePost = ({post, small = false, ...props}) => {
    const [isSelected, setIsSelected] = useState(false);

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    return (<>
        <motion.div
            className={isSelected ? "selectedPost" : ""}
            style={{
                position: "absolute",
                top: 0,
                x: x,
                rotate: rotate,
                cursor: "grab",
                boxShadow: 4 - props.indicatorIndex ? '0 20px 40px 0 rgb(41 41 211 / 55%)' : 'none'
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
            <motion.div
                style={{
                    scale: scale
                }}
            />
            <>
                <div className={`card-content-container`} onClick={() => {setIsSelected(!isSelected)}}>
                    <motion.div
                        className={"card-content"}
                    >
                        <Post small={small} post={post}/>
                    </motion.div>
                </div>
            </>
        </motion.div>
            {/*{<ControlledExpandPost deport={!isSelected} isSelectedProp={isSelected} setIsSelectedProp={setIsSelected} post={post}/>}*/}
        </>
    )
};


export default SwipePost;