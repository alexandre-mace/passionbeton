import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import Post from "../mobile/Post";
import PostFullContent from "../../blocks/PostFullContent";
import DesktopPost from "./DesktopPost";

const DesktopPostWrapper = ({post, small, withPreview = false, setPreviewMeasurements}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isPreviewed, setIsPreviewed] = useState(false)
    const cardRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (withPreview && isPreviewed) {
            let screenWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            setTimeout(() => {
                setPreviewMeasurements({
                scrollTo: (window.pageYOffset +
                    (cardRef.current.getBoundingClientRect().left - (screenWidth/2 - cardRef.current.getBoundingClientRect().width/2)))
            });
            }, 250)
        }
    }, [isPreviewed, withPreview])

    useEffect(() => {
        if (isSelected) {
            if (withPreview) {
                document.getElementsByClassName('desktop-posts-wrapper')[0].classList.add('transform-none')
            }
            document.body.classList.add('overflow-hidden');
            return
        }
        if (withPreview) {
            document.getElementsByClassName('desktop-posts-wrapper')[0].classList.remove('transform-none')
        }
        document.body.classList.remove('overflow-hidden');
    }, [isSelected])

    return (
        <>
            <div ref={containerRef} className={`card-content-container ${isSelected && "open"}`}>
                <motion.div
                    ref={cardRef}
                    className={`card-content`}
                    layout={true}
                    onHoverStart={() => {if (withPreview && !isSelected) setIsPreviewed(true)}}
                    onHoverEnd={() => {if (withPreview && !isSelected) setIsPreviewed(false)}}
                    onClick={() => {if (!isSelected) setIsSelected(!isSelected)}}
                >
                    <DesktopPost
                        withPreview={withPreview}
                        small={small}
                        post={post}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                    />
                    {isSelected &&
                        <PostFullContent post={post} isSelected={isSelected} withFooter={true}/>
                    }
                </motion.div>
            </div>
        </>
    )
}

export default DesktopPostWrapper;