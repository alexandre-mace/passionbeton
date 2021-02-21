import React, {useRef, useState} from 'react';
import {motion, useCycle} from "framer-motion";
import PostTags from "../../blocks/PostTags";
import PostTitle from "../../blocks/PostTitle";
import PostContent from "../../blocks/PostContent";
import PostLink from "../../blocks/PostLink";
import PostMetadata from "../../blocks/PostMetadata";
import PostClose from "../../blocks/PostClose";
import PostFullContent from "../../blocks/PostFullContent";

const Post = ({post, small = false, onToggleFocus, id}) => {
    const cardRef = useRef(null)
    const [isSelected, setIsSelected] = useState(false)
    const [animate, cycleCard] = useCycle(
        {
            card: {
                height: small ? '250px': '335px',
                transform: 'none',
                width: 'calc(90vw)',
                position: 'relative',
                zIndex: 0,
                borderRadius: '16px',
                overflow: 'hidden'
            },
            image: {
                width: "100%",
                marginLeft: "0rem",
                marginRight: "0rem",
                marginTop: "0rem"
            }
        },
        {
            card: {
                height: '100vh',
                transform: 'translateY(-10rem)',
                width: '100vw',
                zIndex: 30,
                borderRadius: '0px',
                paddingTop: '2px',
                paddingBottom: '2px',
                overflow: 'scroll'
            },
            image: {
                width: "125%",
                marginLeft: "-3rem",
                marginRight: "-3rem",
                marginTop: "-1rem"
            }
        }
    );

    if (id === 0) {
        console.log(animate.card)
    }
    return (
        <motion.div
            className={
                "card" +
                (small ? ' card-small' : "")
            }
            onClick={() => {
                cycleCard();
                if (animate.card.transform !== 'none') {
                    document.body.classList.remove('overflow-hidden')
                } else {
                    document.body.classList.add('overflow-hidden')
                }
                // onToggleFocus();
            }}
            animate={animate.card.transform === 'none' ? animate.card : Object.assign(animate.card, {
                height: 'calc(100vh + 2px)',
                transform: 'translateY(-'+  (cardRef.current ? parseFloat(cardRef.current.getBoundingClientRect().top) + 2 + 'px' : '4rem') +')'
            })}            transition={{ ease: "easeOut", delay: 0.1 }}
            ref={cardRef}
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
            {isSelected &&
            <PostFullContent post={post} isSelected={isSelected}/>
            }
        </motion.div>
    )
}

export default Post;