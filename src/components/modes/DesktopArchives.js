import React, { useState } from 'react';
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";
import DesktopPostWrapper from "../post/types/desktop/DesktopPostWrapper";
import getTags from "../../domain/getTags";

const Archives = ({ posts }) => {
    const [search, setSearch] = useState('');

    return (
        <div>
            <div>
                <ArchivesHeader/>
                <div className={"archive-search"}>
                    <input type="text" placeholder={"Rechercher dans les archives"} value={search} onChange={(event => {setSearch(event.target.value)})} />
                </div>
                <div className={"inline-categories"}>
                    {getTags().map((tag, index) => (
                        <div key={index} className={"card card-category " + (index === 0 ? "mr-2" : index + 1 === getTags().length ? "ml-2" : "mx-2")} style={{
                            backgroundColor: tag.color + 'FB',
                        }}
                             onClick={() => {
                                 setSearch(tag.label)
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
                </div>
                <div className={"row"}>
                    {[...posts].filter(post => filterPosts(search.split(' '), post)).map((post, index) => (
                        <div className={"card-wrapper col-md-6 col-lg-4"} key={index}>
                            <DesktopPostWrapper post={post} small={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )};

export default Archives;