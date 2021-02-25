import React, {useEffect, useState} from 'react';
import Confetti from "../animations/Confetti";
import PostIndexIndicator from "../post/blocks/PostIndexIndicator";
import LatestHeader from "../headers/LatestHeader";
import XPostSwipeWrapper from "../post/types/mobile/XPostSwipeWrapper";
import XCategorySwipeWrapper from "../post/types/mobile/XCategorySwipeWrapper";

const Latest = ({ posts, handleSearch }) => {
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const [swipe, setSwipe] = useState(null)

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
                <XPostSwipeWrapper
                    posts={posts.slice(0, 5)}
                    setSwipe={setSwipe}
                    throwConfettis={throwConfettis}
                    postIndex={postIndex}
                />
            </>
            <div className={"categories"}>
                <div className={"categories-title"}>Catégories</div>
                <XCategorySwipeWrapper posts={posts} handleSearch={handleSearch}/>
            </div>
            {confetti && <Confetti stop={() => setConfetti(false)}/>}
        </div>
    )
}

export default Latest;