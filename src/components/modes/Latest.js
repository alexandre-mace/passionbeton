import React, {useEffect, useState} from 'react';
import Confetti from "../animations/Confetti";
import xSwipe from '../../assets/xSwipe.png';
import SwipeActions from "../animations/SwipeActions";
import PostIndexIndicator from "../PostIndexIndicator";
import Header from "../post/Header";
import PostsWithSwipe from "../PostsWithSwipe";

const Latest = ({ postsProp }) => {
    const [posts, setPosts] = useState(postsProp);
    const [removedPosts, setRemovedPosts] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const [swipe, setSwipe] = useState(null)

    useEffect(() => {
        if (postIndex === postsProp.length) {
            throwConfettis()
        }
    }, [postIndex])

    const getLastRemovedPost = () => {
        if ((posts.length > 0 || posts.length === 0) && removedPosts.length > 0) {
            setPosts([removedPosts[removedPosts.length - 1], ...posts])
            setRemovedPosts((removedPosts.filter((post, loopIndex) => loopIndex !== removedPosts.length - 1)))
            setPostIndex(postIndex - 1)
        }
    }

    useEffect(() => {
        if (swipe !== null) {
            if (posts.length > 0 || (posts.length === 0 && removedPosts.length > 0)) {
                setRemovedPosts([...removedPosts, posts.find((post, loopIndex) => loopIndex === 0)])
                setPosts(posts.filter((post, loopIndex) => loopIndex !== 0))
            }
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
            <Header/>
            <>
                <PostIndexIndicator postIndex={postIndex} steps={6}/>
                <PostsWithSwipe posts={posts} setSwipe={setSwipe} throwConfettis={throwConfettis} postIndex={postIndex}/>
                <SwipeActions swipeBack={getLastRemovedPost}/>
                <div className={"swipe-indicator"}><img className={""} src={xSwipe} alt=""/></div>
            </>
            {confetti && <Confetti stop={() => setConfetti(false)}/>}
        </div>
    )
}

export default Latest;