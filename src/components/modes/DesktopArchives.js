import React, { useState, useEffect } from 'react';
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";
import DesktopExpandPost from "../DesktopExpandPost";

const Archives = ({ postsProp }) => {
    const [posts, setPosts] = useState(postsProp);
    const [allPosts, setAllPosts] = useState(postsProp);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPosts(allPosts.filter(post => filterPosts(search.split(' '), post)))
    }, [search]);

    return (
        <div>
            <div>
                <ArchivesHeader/>
                <div className={"archive-search"}>
                    <input type="text" placeholder={"Rechercher dans les archives"} value={search} onChange={(event => {setSearch(event.target.value)})} />
                </div>
                <div className={"row"}>
                    {[...posts].map((post, index) => (
                        <div className={"card-wrapper col-md-6 col-lg-4"} key={index}>
                            <DesktopExpandPost post={post} small={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )};

export default Archives;