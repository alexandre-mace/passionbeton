import React, {useEffect} from 'react'
import TinderCard from "./react-tinder-card";
import SeenAll from "./animations/SeenAll";
import SwipePost from "./SwipePost";
import {motion} from "framer-motion";
import ControlledExpandPost from "./ControlledExpandPost";

const PostsWithSwipe = ({ posts, throwConfettis, setSwipe, postIndex }) => {
    const [expandedPost, setExpandedPost] = React.useState(false);

    return (
        <>
        <div className='swipe-card-container'>
            <TinderCard
                key={'seenall'}
                className='swipe'
                onSwipe={() => throwConfettis()}
                flickOnSwipe={false}
            >
                <div className='swipeCard'>
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0
                        }}
                        animate={{
                            top: postIndex === 5 ? 0 : 35,
                            scale: postIndex === 5 ? 1 : 0.9,
                            transition: { duration: 0.2 }
                        }}
                    >
                    <SeenAll
                        animation={throwConfettis}
                        withAnimation={false}
                    />
                    </motion.div>

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
                            index={loopIndex}
                            indicatorIndex={postIndex}
                            setExpandedPost={setExpandedPost}
                        />
                    </div>
                </TinderCard>
            ))
            }
        </div>
            {posts.length > 0 &&
            <ControlledExpandPost
                post={expandedPost ? expandedPost : posts[0]}
                isExpanded={expandedPost !== false}
                setExpandedPost={setExpandedPost}
            />
            }
        </>
    )
};

export default PostsWithSwipe