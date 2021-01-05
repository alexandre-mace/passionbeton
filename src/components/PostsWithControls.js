import React from 'react'
import Post from "./Post";

const PostsWithControls = ({ posts, throwConfettis, setSwipe }) => {
    return (
        <div className={"desktop-posts-wrapper"}>
            {(posts.length > 0) && posts.map((post, loopIndex) => (
                <div className={"mb-3"} key={loopIndex}>
                    <Post post={post} key={loopIndex}/>
                </div>
            ))}
        </div>
    )
}
export default PostsWithControls;