import React, {useEffect, useRef, useState} from 'react';
import {Chip} from "@material-ui/core";
import getTagColor from "../domain/getTagColor";
import getDomain from "../utils/getDomain";
import ImageIcon from '@material-ui/icons/Image';
import isImage from "../utils/isImage";
import DescriptionIcon from '@material-ui/icons/Description';
import {motion} from "framer-motion";
import CloseIcon from '@material-ui/icons/Close';

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

    const domain = getDomain(post.link)
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
            <div className={"post-header"}
            >
                <div style={{fontSize: '1rem', marginBottom: '0.5rem'}} className={"bold"}>{post.author}</div>
                <div className={"post-date"}>{post.createdAt}</div>
            </div>
            <div className={"post-tags"} style={{marginBottom: '1rem'}}
            >
                {(post.tags !== null) && post.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        style={{marginRight: '0.5rem', marginBottom: '0.3rem', borderColor: getTagColor(tag), color: getTagColor(tag)}}
                        variant="outlined"
                        size={"small"}
                        label={tag}
                    />
                ))}
            </div>
            {(!isSelected && !small)  &&
            <div style={{marginBottom: "1.6rem"}}
            >{post.description.substring(0, (small ? 125 : 130))}{post.description.length > 125 && '...' }</div>
            }
            <div className={"medias-indicator"}>
                {!isSelected && post.medias.map((media, index) => (
                    <div key={index}>
                        {isImage(media.fileName) && (<ImageIcon/>)}
                        {!isImage(media.fileName) && (<DescriptionIcon/>)}
                    </div>
                ))}
            </div>
            {!isSelected &&
            <>
                <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                    <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
                </a>
                <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
            </>
            }
        </div>
    )
}

export default Post;