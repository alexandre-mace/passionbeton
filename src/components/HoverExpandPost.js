import React, {useEffect, useRef, useState} from 'react';
import getDomain from "../utils/getDomain";
import isImage from "../utils/isImage";
import DescriptionIcon from '@material-ui/icons/Description';
import {motion} from "framer-motion";
import {apiAddress} from "../data/config/api";
import PostTags from "./post/PostTags";
import PostTitle from "./post/PostTitle";
import PostContent from "./post/PostContent";
import PostMediaIndicators from "./post/PostMediaIndicators";
import PostLink from "./post/PostLink";
import PostFooter from "./post/PostFooter";
import PostFullContent from "./post/PostFullContent";

const HoverExpandPost = ({post, small, lastScroll, setLastScroll}) => {
    const [isSelected, setIsSelected] = useState(false)
    const myRef = useRef(null)

    useEffect(() => {
        let lastScrollCopy = new Date(lastScroll)
        lastScrollCopy.setSeconds(lastScroll.getSeconds() + 1)

        if (isSelected && !small && (!lastScroll || (new Date() > lastScrollCopy))) {
            setTimeout(() => {
                window.scroll(0, window.pageYOffset + myRef.current.getBoundingClientRect().left - myRef.current.getBoundingClientRect().width/2)
                setLastScroll(new Date())
            }, 150)
        }
    }, [isSelected])

    return (
        <motion.div
            ref={myRef}
            className={"card" + (isSelected ? " selected" : "") + (small ? " small" : "")}
            whileHover={{ width: '60vw', height: '27vw', overflowY: "scroll" }}
            onHoverStart={() => setIsSelected(true)}
            onHoverEnd={() => setIsSelected(false)}
            transition={{ type: "spring", stiffness: 50, duration: 0.1 }}

        >
            <PostTags post={post}/>
            <PostTitle post={post}/>
            {(!isSelected && !small)  &&
            <PostContent post={post}/>
            }
            {!isSelected &&
                <>
                    <PostMediaIndicators post={post} isSelected={isSelected}/>
                    <PostLink post={post} />
                    <PostFooter post={post}/>
                </>
            }

            {isSelected &&
                <PostFullContent post={post} isSelected={isSelected}/>
            }
        </motion.div>
    )
}

export default HoverExpandPost;