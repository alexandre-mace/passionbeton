import React from 'react';
import getDomain from "../../utils/getDomain";
import {Chip} from "@material-ui/core";
import getTagColor from "../../domain/getTagColor";

const Figure = ({figure, small = false}) => {
    const domain = getDomain(figure.link)
    return (
        <div className={"card figure" + (small ? ' card-archive' : "")}>
            <div className={"figure-name"}>{figure.name}</div>
            <div style={{marginBottom: '1.4rem'}}>
                {(figure.tags !== null) && figure.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        style={{marginRight: '0.5rem', borderColor: getTagColor(tag), color: getTagColor(tag)}}
                        variant="outlined"
                        size={"small"}
                        label={tag}
                    />
                ))}
            </div>
            <div className="card-actions">
                <a href={figure.link} target={"_blank"} rel={"noreferrer"}>
                    <div className={"button" + (domain === null ? " disabled" : "")}>Découvrir</div>
                </a>
                <div className={"domain-helper"}>({ domain === null ? 'lien invalide' : domain})</div>
            </div>
        </div>
    )
}

export default Figure;
