import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import Confetti from "../Confetti";
import Header from "../Header";
import TopNavigation from "../TopNavigation";
import {motion, useSpring, useTransform, useViewportScroll} from "framer-motion";
import DesktopExpandPost from "../DesktopExpandPost";
import ResizeObserver from "resize-observer-polyfill";

const DesktopLatest = ({ postsProp, mode, setMode }) => {
    const [confetti, setConfetti] = useState(false);
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

    return (
        <>
        <div className="scroll-container">
            <TopNavigation mode={mode} setMode={setMode}/>
            <Header/>
            <motion.div className={"desktop-posts-wrapper"}
                        ref={scrollRef}
                        style={{ x: spring }}
            >
                {(postsProp.length > 0) && postsProp.map((post, loopIndex) => (
                    <div key={loopIndex}>
                        <DesktopExpandPost post={post}/>
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