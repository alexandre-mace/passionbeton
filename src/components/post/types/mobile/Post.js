import React, {useRef, useState} from 'react';
import {motion, useCycle} from "framer-motion";
import PostTags from "../../blocks/PostTags";
import PostTitle from "../../blocks/PostTitle";
import PostContent from "../../blocks/PostContent";
import PostLink from "../../blocks/PostLink";
import PostMetadata from "../../blocks/PostMetadata";
import PostClose from "../../blocks/PostClose";
import PostFullContent from "../../blocks/PostFullContent";
import {usePrevious} from "react-use";

const Post = ({
                  post,
                  small = false,
                  defaultWidth= 90,
                  handleSelected = () => {},
                  context = 'none',
                  id
}) => {
    const cardRef = useRef(null)
    const [isSelected, setIsSelected] = useState(false)
    const prevSelected = usePrevious(isSelected)

    const [animate, cycleCard] = useCycle(
        {
            card: {

            },
        },
        {
            card: {

            },
        }
    );

    const handleClose = () => {
        console.log('hi')
        handleSelected(false)
        if (context === 'xswipe') {
            setTimeout(() => {
                document.getElementsByClassName('react-swipeable-view-container')[0].parentElement.classList.remove('overflow-visible')
            }, 500)
            document.getElementsByClassName('react-swipeable-view-container')[0].children[id].classList.remove('xswipe-context')
            document.getElementsByClassName('MuiBottomNavigation-root')[0].style.zIndex = 0
        }
        setIsSelected(false)
    }
    console.log(isSelected)
    return (
        <motion.div
            className={
                "card" +
                (small ? ' card-small' : "") +
                ((prevSelected === true && isSelected === false) ? ' fadeIn' : "") +
                (isSelected === true ? ' card-selected' : "")
            }
            onClick={() => {
                if (!document.getElementsByClassName('react-swipeable-view-container')[0].parentElement.classList.contains('overflow-visible')) {
                    setIsSelected(true)
                    handleSelected(true)
                    if (context === 'xswipe') {
                        document.getElementsByClassName('react-swipeable-view-container')[0].parentElement.classList.add('overflow-visible')
                        document.getElementsByClassName('react-swipeable-view-container')[0].children[id].classList.add('xswipe-context')
                        document.getElementsByClassName('MuiBottomNavigation-root')[0].style.zIndex = -1
                    }
                }
            }}
            animate={animate.card.zIndex !== 30 ? animate.card : Object.assign(animate.card, {
                height: 'calc(100vh + 2px)',
                transform: 'translateY(-'+  (cardRef.current ? parseFloat(Math.ceil(cardRef.current.getBoundingClientRect().top)) + 2 + 'px' : '4rem') +')',
            })}
            transition={{ ease: "easeOut", duration: 0.1, delay: 0.1 }}
            ref={cardRef}
        >
            <div className="card-content-wrapper">
                {isSelected &&  <PostClose post={post} close={handleClose}/>}
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