import React, {useEffect, useState} from 'react';
import Confetti from "../animations/Confetti";
import PostIndexIndicator from "../post/blocks/PostIndexIndicator";
import LatestHeader from "../headers/LatestHeader";
import XSwipeWrapper from "../post/types/mobile/XSwipeWrapper";

const Latest = ({ posts }) => {
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const [swipe, setSwipe] = useState(null)

    useEffect(() => {
        document.getElementsByClassName('MuiBottomNavigation-root')[0].style.position = 'absolute'
    }, [])

    useEffect(() => {
        if (swipe !== null) {
            if (swipe === 'next') {
                setPostIndex(postIndex + 1)
                setSwipe(null)
            }

            if (swipe === 'prev') {
                setPostIndex(postIndex - 1)
                setSwipe(null)
            }
        }
    }, [swipe])

    const throwConfettis = () => {
        if (!confetti) {
            setConfetti(true)
        }
    }

    return (
        <div>
            <LatestHeader/>
            <>
                <PostIndexIndicator postIndex={postIndex} steps={6}/>
                <XSwipeWrapper
                    posts={posts}
                    setSwipe={setSwipe}
                    throwConfettis={throwConfettis}
                    postIndex={postIndex}
                />
            </>
            {confetti && <Confetti stop={() => setConfetti(false)}/>}
        </div>
    )
}

export default Latest;