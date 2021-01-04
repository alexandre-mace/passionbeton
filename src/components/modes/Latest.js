import React, {useEffect, useState} from 'react';
import {makeStyles, MobileStepper} from "@material-ui/core";
import Confetti from "../Confetti";
import SeenAll from "../SeenAll";
import SwipePost from "../SwipePost";
import xSwipe from '../../assets/xSwipe.png';
import TinderCard from './../react-tinder-card/index'
import { motion } from "framer-motion"

const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 4,
    },
});

const Latest = ({ postsProp }) => {
    const classes = useStyles();
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
            console.log(swipe)

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
            {
            <div>
                <div className={"header"}>
                    <div className={"header-title"}>
                        <div>Cool de se revoir ! <span className="emoji">👋</span></div>
                    </div>
                    <div className={"header-subtitle"}>Voici les derniers partages par les passionés de béton.</div>
                </div>
                <div>
                    <div className={"postindex-indicator"}>
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
                    </div>
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
                        {(posts.length > 0) && [...posts].reverse().map((post, loopIndex) => (
                            <TinderCard
                                key={loopIndex}
                                className='swipe'
                                onSwipe={(direction) => setSwipe(direction)}
                            >
                                <div className='swipeCard'>
                                    <SwipePost
                                        post={post}
                                    />
                                </div>
                            </TinderCard>
                            ))
                        }
                    </div>
                </div>
                <div className={"swipe-actions"}>
                    <motion.button onClick={() => getLastRemovedPost()}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.9 }}
                    ><img className={"swipe-back-icon"} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDMxNy44NzggMzE3Ljg3OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoNC4yODYyNjM3OTcwMTU3MzZlLTE2LC0xLC0xLC00LjI4NjI2Mzc5NzAxNTczNmUtMTYsMzE3Ljg3Nzc4NzU5MDAyNjksMzE3Ljg3Nzc4NzU5MDAyNjk3KSI+CjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0iTTMxNS42MDcsNzAuMjM3Yy0yLjY1My0zLjA4Ni03LjE4OS0zLjg4MS0xMS43MjktMS45MjhsLTM4LjA0MiwxNi4zNjlDMjQwLjY3NCw0My4zMTQsMTk1LjE2MywxNS42MywxNDMuMzA5LDE1LjYzICBDNjQuMjg4LDE1LjYzLDAsNzkuOTE4LDAsMTU4LjkzOXM2NC4yODgsMTQzLjMwOSwxNDMuMzA5LDE0My4zMDljMTEuMDQ2LDAsMjAtOC45NTQsMjAtMjBzLTguOTU0LTIwLTIwLTIwICBDODYuMzQ0LDI2Mi4yNDcsNDAsMjE1LjkwMyw0MCwxNTguOTM5Uzg2LjM0NCw1NS42MywxNDMuMzA5LDU1LjYzYzM1LjM3OSwwLDY2LjY1NywxNy44OCw4NS4yODQsNDUuMDc0bC0zNi4yNzEsMTUuNjA3ICBjLTMuODg1LDEuNjcyLTYuMzE0LDQuNjI5LTYuNjY2LDguMTEzYy0wLjM1MSwzLjQ4MywxLjQ0LDYuODY2LDQuOTEzLDkuMjc5bDkzLjUwMyw2NC45NzljMi4xMjksMS40NzksNC40NDgsMi4yNjIsNi43MDYsMi4yNjIgIGMwLjAwMSwwLDAuMDAxLDAsMC4wMDEsMGM1LjAyOCwwLDguOTgtMy43Nyw5LjgzMi05LjM3OWwxNy4xMDMtMTEyLjU3MkMzMTguMjM5LDc1LjUzOCwzMTcuNDkxLDcyLjQyOSwzMTUuNjA3LDcwLjIzN3oiIGZpbGw9IiMwMDAwMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" /></motion.button>
                </div>
                <div className={"swipe-indicator"}><div><img className={""} src={xSwipe} alt=""/></div></div>
                {confetti && <Confetti stop={() => setConfetti(false)}/>}
            </div>
            }
        </div>
    )}

export default Latest;