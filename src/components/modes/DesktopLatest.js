import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Confetti from "../Confetti";
import Header from "../Header";
import { useWindowSize } from 'react-use'
import TopNavigation from "../TopNavigation";
import {motion, useSpring, useTransform, useViewportScroll} from "framer-motion";
import DesktopExpandPost from "../DesktopExpandPost";
import ResizeObserver from "resize-observer-polyfill";

const DesktopLatest = ({ postsProp, mode, setMode }) => {
    const [posts, setPosts] = useState(postsProp);
    const [removedPosts, setRemovedPosts] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const { width, height } = useWindowSize()
    const ghostRef = useRef(null)
    const [scrollRange, setScrollRange] = useState(0)
    const scrollRef = useRef(null)
    const [viewportW, setViewportW] = useState(0)

    useLayoutEffect(() => {
        scrollRef && setScrollRange(scrollRef.current.scrollWidth)
    }, [scrollRef])

    const onResize = useCallback(entries => {
        for (let entry of entries) {
            setViewportW(entry.contentRect.width)
        }
    }, [])

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(entries => onResize(entries))
        resizeObserver.observe(ghostRef.current)
        return () => resizeObserver.disconnect()
    }, [onResize])

    const { scrollYProgress } = useViewportScroll()
    const transform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -scrollRange + viewportW]
    )
    const physics = { damping: 10, mass: 0.27, stiffness: 60 };
    const spring = useSpring(transform, physics)

    useEffect(() => {
        if (postIndex === postsProp.length) {
            throwConfettis()
        }
    }, [postIndex])

    const throwConfettis = () => {
        if (!confetti) {
            setConfetti(true)
        }
    }

    return (
        <>
        <div className="scroll-container">
            <TopNavigation mode={mode} setMode={setMode}/>
            <Header/>
            <motion.div className={"desktop-posts-wrapper"}
                        ref={scrollRef}
                        style={{ x: spring }}
            >
                {(posts.length > 0) && posts.map((post, loopIndex) => (
                    <div key={loopIndex}>
                        <DesktopExpandPost post={post} small={true}/>
                    </div>
                ))}
            </motion.div>
            {confetti && <Confetti stop={() => setConfetti(false)}/>}
        </div>
        <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
        </>
    )
}

export default DesktopLatest;