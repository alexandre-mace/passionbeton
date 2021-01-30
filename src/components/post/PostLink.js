import React from 'react';
import getDomain from "../../utils/getDomain";

const PostLink = ({post}) => {

    const domain = getDomain(post.link)

    return (
        <>
            <a href={post.link} target={"_blank"} rel={"noreferrer"}>
                <div className={"button" + (domain === null ? " disabled" : "")}>Lire</div>
            </a>
            <div className={"domain-helper"}>({domain === null ? 'lien invalide' : domain})</div>
        </>
    )
}

export default PostLink;