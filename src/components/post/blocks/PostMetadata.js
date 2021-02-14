import React from 'react';
import PostMediaIndicators from "./PostMediaIndicators";
import PostCommentIndicator from "./PostCommentIndicator";
import PostLikesIndicator from "./PostLikesIndicator";

const PostMetadata = ({post}) => {
    return (
        <div className={"post-written-metadata"} style={{fontSize: '1rem'}}
        >
            <div className={"d-flex justify-content-between"}>
                <div className={"post-author"}>{post.author}</div>
                <div className={"post-date"} style={{}}>{post.createdAt}</div>
            </div>
            <div className="d-flex">
                <PostLikesIndicator post={post}/>
                <div className={"mr-4"}/>
                <PostCommentIndicator post={post}/>
                <div className={"mx-1"}/>
                <PostMediaIndicators post={post}/>
            </div>
        </div>
    )
}

export default PostMetadata;