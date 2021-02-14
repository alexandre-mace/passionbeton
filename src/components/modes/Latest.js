import React, {useEffect, useState} from 'react';
import Confetti from "../animations/Confetti";
import xSwipe from '../../assets/xSwipe.png';
import SwipeActions from "../animations/SwipeActions";
import PostIndexIndicator from "../post/blocks/PostIndexIndicator";
import LatestHeader from "../headers/LatestHeader";
import PostsWithSwipe from "../post/types/mobile/PostsWithSwipe";

const Latest = ({ posts }) => {
    const [removedPosts, setRemovedPosts] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const [swipe, setSwipe] = useState(null)

    useEffect(() => {
        if (posts.filter((post) => !removedPosts.includes(post.id)).length === 0) {
            throwConfettis()
        }
    }, [postIndex])

    const getLastRemovedPost = () => {
        if (removedPosts.length > 0) {
            const newRemovedPosts = [...removedPosts];
            newRemovedPosts.pop()
            setRemovedPosts(newRemovedPosts)
            setPostIndex(postIndex - 1)
        }
    }

    useEffect(() => {
        if (swipe !== null) {
            setRemovedPosts([...removedPosts, posts[postIndex].id])
            setPostIndex(postIndex + 1)
            setSwipe(null)
        }
    }, [swipe])

    const throwConfettis = () => {
        if (!confetti) {
            setConfetti(true)
        }
    }

    useEffect(() => {
        if (posts.length === 0 && !confetti) {
            setConfetti(true)
        }
    }, [posts])

    return (
        <div>
            <LatestHeader/>
            <>
                <PostIndexIndicator postIndex={postIndex} steps={6}/>
                <PostsWithSwipe
                    posts={posts.filter((post) => !removedPosts.includes(post.id)).reverse()}
                    setSwipe={setSwipe}
                    throwConfettis={throwConfettis}
                    postIndex={postIndex}
                />
                <SwipeActions swipeBack={getLastRemovedPost}/>
                <div className={"swipe-indicator"}><img className={""} src={xSwipe} alt=""/></div>
            </>
            {confetti && <Confetti stop={() => setConfetti(false)}/>}
        </div>
    )
}

export default Latest;