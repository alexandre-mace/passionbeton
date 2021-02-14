import React, { useState, useEffect } from 'react';
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";
import DesktopPost from "../post/types/desktop/DesktopPost";

const Archives = ({ posts }) => {
    const [search, setSearch] = useState('');

    return (
        <div>
            <div>
                <ArchivesHeader/>
                <div className={"archive-search"}>
                    <input type="text" placeholder={"Rechercher dans les archives"} value={search} onChange={(event => {setSearch(event.target.value)})} />
                </div>
                <div className={"row"}>
                    {[...posts].filter(post => filterPosts(search.split(' '), post)).map((post, index) => (
                        <div className={"card-wrapper col-md-6 col-lg-4"} key={index}>
                            <DesktopPost post={post} small={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )};

export default Archives;