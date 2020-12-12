import React from 'react';
import getDomain from "../utils/getDomain";

const Post = ({post, small = false}) => {
    const domain = getDomain(post.link)
    return (
        <div className={"card" + (small ? ' card-archive' : "")}>
            <div>{post.description}</div>
            <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
            </a>
            <div className={"domain-helper"}>({ domain === null ? 'lien invalide' : domain})</div>
        </div>
    )};

export default Post;
