import React, {useEffect, useState} from 'react';
import Confetti from "../Confetti";
import xSwipe from '../../assets/xSwipe.png';
import SwipeActions from "../SwipeActions";
import PostIndexIndicator from "../PostIndexIndicator";
import Header from "../Header";
import { useWindowSize } from 'react-use'
import PostsWithSwipe from "../PostsWithSwipe";
import PostsWithControls from "../PostsWithControls";

const Latest = ({ postsProp }) => {
    const [posts, setPosts] = useState(postsProp);
    const [removedPosts, setRemovedPosts] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const [swipe, setSwipe] = useState(null)
    const { width, height } = useWindowSize()

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
            {width < 800 &&
                <>
                    <PostIndexIndicator postIndex={postIndex} steps={6}/>
                    <PostsWithSwipe posts={posts} setSwipe={setSwipe} throwConfettis={throwConfettis}/>
                    <SwipeActions swipeBack={getLastRemovedPost}/>
                    <div className={"swipe-indicator"}><img className={""} src={xSwipe} alt=""/></div>
                </>
            }
            {width >= 800 &&
            <>
                <PostsWithControls posts={posts} setSwipe={setSwipe} throwConfettis={throwConfettis}/>
            </>
            }
            {confetti && <Confetti stop={() => setConfetti(false)}/>}
        </div>
    )
}

export default Latest;