import React from 'react'
import TinderCard from "./react-tinder-card";
import SeenAll from "./animations/SeenAll";
import SwipePost from "./SwipePost";

const PostsWithSwipe = ({ posts, throwConfettis, setSwipe }) => {
    return (
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
    )
}
export default PostsWithSwipe