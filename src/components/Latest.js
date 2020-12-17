import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, MobileStepper} from "@material-ui/core";
import Confetti from "./Confetti";
import {AnimatePresence, motion} from "framer-motion";
import SeenAll from "./SeenAll";
import SwipePost from "./SwipePost";
import Loader from "./Loader";
import xSwipe from'./../assets/xSwipe.png';

const axios = require('axios');
const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 70
    },
});

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Latest = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [removedPosts, setRemovedPosts] = useState([]);
    const [confetti, setConfetti] = useState(false);
    const [index, setIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState("100%");

    const prevIndex = usePrevious(index)

    useEffect(() => {
        axios.get('https://wd2q3hrfr4-rycbhpqkvnz7k.eu.s5y.io/posts/latest')
            .then(function (response) {
                setPosts(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (posts.length > 0 || (posts.length === 0 && removedPosts.length > 0)) {
            if (index > prevIndex) {
                setRemovedPosts([...removedPosts, posts.find((post, loopIndex) => loopIndex === 0)])
                setPosts(posts.filter((post, loopIndex) => loopIndex !== 0))
            }
            if (index < prevIndex) {
                setPosts([removedPosts[removedPosts.length - 1], ...posts])
                setRemovedPosts((removedPosts.filter((post, loopIndex) => loopIndex !== removedPosts.length - 1)))
            }
        }
    }, [index])

    const throwConfettis = () => {
        if (!confetti) {
            setConfetti(true)
        }
    }

    useEffect(() => {
        if (posts.length === 0 && !loading && !confetti) {
            setConfetti(true)
        }
    }, [posts])

    const isConflict = index === 5 && posts.length === 1;

    return (
        <div style={{ overflow: "hidden"}}>
            {loading && <Loader/>}
            {!loading &&
            <div>
                <div className={"header"}>
                    <div className={"header-title"}><div>Cool de se revoir ! <span className="emoji">👋</span></div> </div>
                    <div className={"header-subtitle"}>Voici les derniers partages par les passionés de béton.</div>
                </div>
                <div>

                <MobileStepper
                    variant="progress"
                    steps={6}
                    position="static"
                    activeStep={index}
                    className={classes.root}
                    style={{backgroundColor: 'transparent', borderRadius: 16, height: 20, marginBottom: 10}}
                    nextButton={
                        <div>
                        </div>
                    }
                    backButton={
                        <div>
                        </div>
                    }
                />
                    <motion.div
                        style={{
                            position: "relative",
                            width: "calc(80vw + 15px)",
                            marginLeft: "10vw",
                            display: "block",
                            height: "auto",
                            minHeight: "382px"
                        }}
                    >
                        <AnimatePresence initial={false}>
                            <>
                                {((posts.length === 0 && !loading) || isConflict) && (
                                    <SeenAll
                                        key={index + 1}
                                        initial={{
                                            scale: 0,
                                            y: 105,
                                            opacity: 0
                                        }}
                                        mock={true}
                                        animate={{
                                            scale: 0.75,
                                            y: 80,
                                            opacity: 0.5
                                        }}
                                        transition={{
                                            scale: { duration: 0.2 },
                                            opacity: { duration: 0.4 }
                                        }}
                                    />
                                )}
                                {((posts.length === 0 && !loading) || isConflict) && (
                                    <SeenAll
                                        key={index}
                                        animate={{
                                            scale: 1,
                                            y: 0,
                                            opacity: 1
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                            opacity: {
                                                duration: 0.2
                                            }
                                        }}
                                        exitX={exitX}
                                        setExitX={setExitX}
                                        index={index}
                                        setIndex={setIndex}
                                        drag="x"
                                        throwConfettis={throwConfettis}
                                    />
                                )}
                                {(posts.length === 1 && index !== 5) && (
                                    <SeenAll
                                        key={index + 1}
                                        initial={{
                                            scale: 0,
                                            y: 105,
                                            opacity: 0
                                        }}
                                        animate={{
                                            scale: 0.75,
                                            y: 80,
                                            opacity: 0.5
                                        }}
                                        transition={{
                                            scale: { duration: 0.2 },
                                            opacity: { duration: 0.4 }
                                        }}
                                    />
                                )}
                                {(posts.length > 0 && index !== 5) && posts.slice(0, 2).map((post, loopIndex) => {
                                    if (loopIndex === 0) {
                                        if (posts.length === 1) {
                                            return (
                                                <SwipePost
                                                    post={posts[0]}
                                                    key={index}
                                                    animate={{
                                                        scale: 1,
                                                        y: 0,
                                                        opacity: 1
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                        opacity: {
                                                            duration: 0.2
                                                        }
                                                    }}
                                                    exitX={exitX}
                                                    setExitX={setExitX}
                                                    index={index}
                                                    setIndex={setIndex}
                                                    drag="x"
                                                />
                                            )
                                        }
                                        return (
                                            <SwipePost
                                                post={posts[1] ? posts[1] : posts[0]}
                                                key={index + 1}
                                                initial={{
                                                    scale: 0,
                                                    y: 105,
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    scale: 0.75,
                                                    y: 80,
                                                    opacity: 0.5
                                                }}
                                                transition={{
                                                    scale: { duration: 0.2 },
                                                    opacity: { duration: 0.4 }
                                                }}
                                            />
                                        )
                                    }
                                    return (
                                        <SwipePost
                                            post={posts[0]}
                                            key={index}
                                            animate={{
                                                scale: 1,
                                                y: 0,
                                                opacity: 1
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20,
                                                opacity: {
                                                    duration: 0.2
                                                }
                                            }}
                                            exitX={exitX}
                                            setExitX={setExitX}
                                            index={index}
                                            setIndex={setIndex}
                                            drag="x"
                                        />
                                    )
                                })}
                            </>
                        </AnimatePresence>
                    </motion.div>
                </div>
                <div className={"swipe-indicator"}><div><img className={""} src={xSwipe} alt=""/></div></div>
                {confetti && <Confetti stop={() => setConfetti(false)}/>}
            </div>
            }
        </div>
)}

export default Latest;