import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import CloseIcon from '@material-ui/icons/Close';
import PostTags from "../../blocks/PostTags";
import PostTitle from "../../blocks/PostTitle";
import PostContent from "../../blocks/PostContent";
import PostLink from "../../blocks/PostLink";
import PostMetadata from "../../blocks/PostMetadata";
import Comments from "../../../comment/Comments";
import PostClose from "../../blocks/PostClose";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const DesktopPost = ({post, small = false, isSelected = false, setIsSelected, withPreview}) => {
    const prevSelected = usePrevious(isSelected)
    let closeContext = false;
    if (prevSelected === true && isSelected === false) {
        closeContext = true;
    }
    const [isPreviewed, setIsPreviewed] = useState(false)
    const [animating, setAnimating] = useState(isSelected || closeContext);
    const [currentFlow, setCurrentFlow] = useState('closed');

    if (currentFlow === 'closed' && isSelected) {
        setCurrentFlow('opening')
        setTimeout(() => {
            setCurrentFlow('opened')
        }, 100)
    }

    if (closeContext && (currentFlow !== 'closing' && currentFlow !== 'closed')) {
        setCurrentFlow('closing')
        setTimeout(() => {
            setCurrentFlow('closed')
        }, 300)
    }

    if (currentFlow === 'closing' && !animating) {
        setAnimating(true)
    }
    if (currentFlow === 'opening' && !animating) {
        setAnimating(true)
    }

    useEffect(() => {
        if (animating) {
            setTimeout(() => {
                setAnimating(false)
            }, 400)
        }
    }, [animating])

    return (
        <motion.div
            className={
                "card" +
                (small ? ' card-small' : "") +
                (animating ? ' card-content-invisible': ' card-content-visible') +
                (isPreviewed ? ' previewed' : ' overflow-hidden')
            }
            onHoverStart={() => {if (!isSelected && withPreview) setIsPreviewed(true)}}
            onHoverEnd={() => {if (!isSelected && withPreview) setIsPreviewed(false)}}
            transition={{ type: "spring", stiffness: 40, duration: 0.05 }}
        >
            <div className="card-content-wrapper">
                {isSelected &&  <PostClose post={post} setIsSelected={setIsSelected}/>}
                <PostTags post={post}/>
                <PostTitle post={post}/>
                {(!isSelected && !small)  &&
                <PostContent post={post}/>
                }
                {!isSelected &&
                <PostLink post={post} />
                }
            </div>

            <PostMetadata post={post}/>
        </motion.div>
    )
}

export default DesktopPost;