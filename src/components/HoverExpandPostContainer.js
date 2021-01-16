import React, {useRef} from 'react';
import {motion} from "framer-motion";
import HoverExpandPost from "./HoverExpandPost";

const HoverExpandPostContainer = ({post, small}) => {
    const cardRef = useRef(null);
    const containerRef = useRef(null);

    return (
        <>
            <motion.div ref={containerRef} className={`card-content-container`}
            >
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                >
                    <HoverExpandPost post={post} small={small}/>
                </motion.div>
            </motion.div>
        </>
    )
}

export default HoverExpandPostContainer;