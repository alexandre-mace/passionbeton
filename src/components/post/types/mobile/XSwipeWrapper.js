import React from 'react'
import SeenAll from "../../../animations/SeenAll";
import Post from "./Post";
import SwipeableViews from "react-swipeable-views";

const styles = {
    root: {
        padding: '0 60px 60px 0',
    },
    slideContainer: {
        overflow: 'visible',
        padding: '0 20px 0 35px',
    },
};


const XSwipeWrapper = ({ posts, throwConfettis, setSwipe, postIndex }) => {
    const [expandedPost, setExpandedPost] = React.useState(false);

    return (
        <SwipeableViews
            style={styles.root}
            disabled={expandedPost}
            slideStyle={styles.slideContainer}
            onChangeIndex={(index, last) => setSwipe(index < last ? 'prev' : 'next')}
        >
            {(posts.length > 0) && [...posts].map((post, loopIndex) => (
                <Post
                    key={loopIndex}
                    small={false}
                    post={post}
                    id={loopIndex}
                    context={'xswipe'}
                    handleSelected={setExpandedPost}
                    defaultWidth={loopIndex !== 0 ? 80 : 85}
                />
            ))}
            <div style={Object.assign({}, styles.slide)} className={"last-latest-post"}>
                <SeenAll
                    animation={throwConfettis}
                    withAnimation={postIndex === posts.length}
                />
            </div>
        </SwipeableViews>
    )
};

export default XSwipeWrapper