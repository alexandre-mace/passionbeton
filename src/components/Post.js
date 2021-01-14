import React, {useEffect, useRef, useState} from 'react';
import {Chip} from "@material-ui/core";
import getTagColor from "../domain/getTagColor";
import getDomain from "../utils/getDomain";
import ImageIcon from '@material-ui/icons/Image';
import isImage from "../utils/isImage";
import DescriptionIcon from '@material-ui/icons/Description';
import {motion} from "framer-motion";
import CloseIcon from '@material-ui/icons/Close';
import PostTags from "./PostTags";
import PostTitle from "./PostTitle";
import PostContent from "./PostContent";
import PostMediaIndicators from "./PostMediaIndicators";
import PostLink from "./PostLink";
import PostFooter from "./PostFooter";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Post = ({post, small = false, isSelected = false, setIsSelected}) => {
    const prevSelected = usePrevious(isSelected)
    let closeContext = false;
    if (prevSelected === true && isSelected === false) {
        closeContext = true;
    }

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
        <div
            style={{pointerEvents: (currentFlow === 'closing' ? 'none' : 'auto')}}
            className={"card" + (small ? ' card-small' : "") + (animating ? ' card-content-invisible': ' card-content-visible')}
        >
            {isSelected &&
            <motion.div
                className={"back-wrapper mb-3"}
                style={{ opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
            >
                <div className={"back"} onClick={() => {setIsSelected(false)}}>
                    <CloseIcon/>
                </div>
            </motion.div>
            }
            <PostTags post={post}/>
            <PostTitle post={post}/>
            {(!isSelected && !small)  &&
                <PostContent post={post}/>
            }
            <PostMediaIndicators post={post} isSelected={isSelected}/>
            {!isSelected &&
                <PostLink post={post} />
            }
            <PostFooter post={post}/>
        </div>
    )
}

export default Post;