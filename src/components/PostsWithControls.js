import React from 'react'
import ExpandPost from "./ExpandPost";

const PostsWithControls = ({ posts, throwConfettis, setSwipe }) => {
    return (
        <div className={"desktop-posts-wrapper"}>
            {(posts.length > 0) && posts.map((post, loopIndex) => (
                <div className={"mb-3"} key={loopIndex}>
                    <ExpandPost post={post} small={true}/>
                </div>
            ))}
        </div>
    )
}
export default PostsWithControls;