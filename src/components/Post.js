import React from 'react';
import {Chip} from "@material-ui/core";
import getTagColor from "../domain/getTagColor";
import getDomain from "../utils/getDomain";

const Post = ({post, small = false}) => {
    const domain = getDomain(post.link)

    return (
        <div className={"card" + (small ? ' card-archive' : "")}>
            <div className={"post-header"}>
                <div style={{fontSize: '1rem', marginBottom: '0.5rem'}} className={"bold"}>{post.author}</div>
                <div className={"post-date"}>{post.createdAt}</div>
            </div>
            <div className={"post-tags"} style={{marginBottom: '1.3rem'}}>
                {(post.tags !== null) && post.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        style={{marginRight: '0.5rem', borderColor: getTagColor(tag), color: getTagColor(tag)}}
                        variant="outlined"
                        size={"small"}
                        label={tag}
                    />
                ))}
            </div>
            <div style={{marginBottom: "1.6rem"}}>{post.description.substring(0, (small ? 125 : 130))}{post.description.length > 125 && '...' }</div>
            <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
            </a>
            <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
        </div>
    )
}

export default Post;