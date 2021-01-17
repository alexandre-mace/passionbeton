import React, {useRef, useState} from 'react';
import {motion} from "framer-motion";
import HoverExpandPost from "./HoverExpandPost";

const HoverExpandPostContainer = ({post, small}) => {
    const cardRef = useRef(null);
    const containerRef = useRef(null);
    const [lastScroll, setLastScroll] = useState(new Date())

    return (
        <>
            <motion.div ref={containerRef} className={`card-content-container`}
            >
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                >
                    <HoverExpandPost post={post} small={small} lastScroll={lastScroll} setLastScroll={setLastScroll}/>
                </motion.div>
            </motion.div>
        </>
    )
}

export default HoverExpandPostContainer;