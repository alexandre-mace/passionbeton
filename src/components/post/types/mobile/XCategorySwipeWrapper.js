import React from 'react'
import SwipeableViews from "react-swipeable-views";
import getTags from "../../../../domain/getTags";
import filterPosts from "../../../../filters/filterPosts";

const styles = {
    root: {
        padding: '0 186px 50px 18px',
    },
    slideContainer: {
        overflow: 'visible',
        padding: '0 35px 0 0'
    },
};

const XCategorySwipeWrapper = ({posts, handleSearch}) => {
    return (
        <SwipeableViews
            style={styles.root}
            slideClassName={'category-slide'}
            slideStyle={styles.slideContainer}
        >
            {getTags().map((tag, index) => (
                <div key={index} className={"card card-category"} style={{
                    backgroundColor: tag.color + 'FB',
                }}
                onClick={() => {
                    handleSearch(tag.label)
                }}
                >
                    <div className={"category-emoji-wrapper"}>
                        <img src={tag.emoji} alt=""/>
                    </div>
                    <div className={'category-tag-label mt-2'}>{tag.label}</div>
                    <div>
                        {posts.filter(post => filterPosts(tag.label.split(' '), post)).length} posts
                    </div>
                </div>
            ))}
        </SwipeableViews>
    )
};

export default XCategorySwipeWrapper