import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Confetti from "../animations/Confetti";
import LatestHeader from "../headers/LatestHeader";
import TopNavigation from "../navigation/TopNavigation";
import {motion, useSpring, useTransform, useViewportScroll} from "framer-motion";
import ResizeObserver from "resize-observer-polyfill";
import DesktopPost from "../post/types/desktop/DesktopPost";

const DesktopLatest = ({ posts, mode, setMode }) => {
    const [confetti, setConfetti] = useState(false);
    const ghostRef = useRef(null)
    const [scrollRange, setScrollRange] = useState(0)
    const scrollRef = useRef(null)
    const [viewportW, setViewportW] = useState(0)
    const [lastPreview, setLastPreview] = useState(new Date())
    const [previewMeasurements, setPreviewMeasurements] = useState({
        scrollTo: null
    })

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
        let lastPreviewCopy = new Date(lastPreview)
        lastPreviewCopy.setMilliseconds(lastPreview.getMilliseconds() + 500)
        if (previewMeasurements.scrollTo && (!lastPreview || (new Date() > lastPreviewCopy))) {
            window.scroll(0, previewMeasurements.scrollTo);
            setLastPreview(new Date())
        }
    }, [previewMeasurements])

    return (
        <>
            <div className="scroll-container">
                <TopNavigation mode={mode} setMode={setMode}/>
                <LatestHeader/>
                <motion.div className={"desktop-posts-wrapper"}
                            ref={scrollRef}
                            style={{ x: spring }}
                >
                    {(posts.length > 0) && posts.map((post, loopIndex) => (
                        <div key={loopIndex}>
                            <DesktopPost post={post} withPreview={true} setPreviewMeasurements={setPreviewMeasurements}/>
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