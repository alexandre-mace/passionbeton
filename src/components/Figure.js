import React from 'react';
import getDomain from "../utils/getDomain";

const Figure = ({figure, small = false}) => {
    const domain = getDomain(figure.link)
    return (
        <div className={"card" + (small ? ' card-archive' : "")}>
            <div className={"figure-name"}>{figure.name}</div>
            <a href={figure.link} target={"_blank"} rel={"noreferrer"}>
                <div className={"button" + (domain === null ? " disabled" : "")}>Découvrir</div>
            </a>
            <div className={"domain-helper"}>({ domain === null ? 'lien invalide' : domain})</div>
        </div>
    )};

export default Figure;
