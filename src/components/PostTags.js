import React from 'react';
import {Chip} from "@material-ui/core";
import getTagColor from "../domain/getTagColor";

const PostTags = ({post}) => {
    return (
            <div className={"post-tags"} style={{marginBottom: '0.3rem'}}
            >
                {(post.tags !== null) && post.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        style={{
                            marginRight: '0.5rem',
                            marginBottom: '0.3rem',
                            borderColor: getTagColor(tag),
                            color:'white',
                            backgroundColor: getTagColor(tag)
                        }}
                        size={"small"}
                        label={tag}
                    />
                ))}
            </div>
    )
}

export default PostTags;