import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, MobileStepper} from "@material-ui/core";
import Confetti from "../Confetti";
import SeenAll from "../SeenAll";
import SwipePost from "../SwipePost";
import xSwipe from '../../assets/xSwipe.png';
import TinderCard from './../react-tinder-card/index'

const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 70
    },
});

// function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value;
//     });
//     return ref.current;
// }

const Latest = ({ postsProp }) => {
    const classes = useStyles();
    const [posts, setPosts] = useState(postsProp);
    const [removedPosts, setRemovedPosts] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [postIndex, setPostIndex] = React.useState(0);
    const [swipe, setSwipe] = useState(false)


    useEffect(() => {
        if (postIndex === postsProp.length) {
            throwConfettis()
        }
        // if (posts.length > 0 || (posts.length === 0 && removedPosts.length > 0)) {
        //     if (index > prevIndex) {
        //         setRemovedPosts([...removedPosts, posts.find((post, loopIndex) => loopIndex === 0)])
        //         setPosts(posts.filter((post, loopIndex) => loopIndex !== 0))
        //     }
        //     if (index < prevIndex) {
        //         setPosts([removedPosts[removedPosts.length - 1], ...posts])
        //         setRemovedPosts((removedPosts.filter((post, loopIndex) => loopIndex !== removedPosts.length - 1)))
        //     }
        // }
    }, [postIndex])

    useEffect(() => {
        if (swipe) {
            setPostIndex(postIndex + 1)
            setSwipe(false)
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

    console.log(postIndex)
    return (
        <div>
            {
            <div>
                <div className={"header"}>
                    <div className={"header-title"}>
                        <div>Cool de se revoir ! <span className="emoji">👋</span></div>
                    </div>
                    <div className={"header-subtitle"}>Voici les derniers partages par les passionés de béton.</div>
                </div>
                <div>
                    <MobileStepper
                        variant="progress"
                        steps={6}
                        position="static"
                        activeStep={postIndex}
                        className={classes.root}
                        style={{backgroundColor: 'transparent', borderRadius: 16, height: 20, marginBottom: 10}}
                        nextButton={<div/>}
                        backButton={<div/>}
                    />
                    <div className='swipe-card-container'>
                        <TinderCard
                            key={posts.length + 1}
                            className='swipe'
                            onSwipe={() => throwConfettis()}
                            flickOnSwipe={false}
                        >
                            <div className='swipeCard'>
                                <SeenAll
                                    animation={throwConfettis}
                                    withAnimation={false}
                                />
                            </div>
                        </TinderCard>
                        {(posts.length > 0) && [...posts].reverse().map((post, loopIndex) =>
                            <TinderCard
                                key={loopIndex}
                                className='swipe'
                                // onSwipe={(direction) => setSwipe(true)}
                                onCardLeftScreen={() => setSwipe(true)}
                                preventSwipe={['right']}
                            >
                                <div className='swipeCard'>
                                    <SwipePost
                                        post={post}
                                    />
                                </div>
                            </TinderCard>
                        )}
                    </div>

                </div>
                <div className={"swipe-indicator"}><div><img className={""} src={xSwipe} alt=""/></div></div>
                {confetti && <Confetti stop={() => setConfetti(false)}/>}
            </div>
            }
        </div>
    )}

export default Latest;