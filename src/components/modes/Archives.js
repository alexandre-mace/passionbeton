import React, { useState, useEffect } from 'react';
import ExpandPost from "../ExpandPost";
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";

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
                    <input
                        type="text"
                        placeholder={"Rechercher dans les archives"}
                        value={search}
                        onChange={(event => {setSearch(event.target.value)})}
                    />
                </div>
                {posts.map((post, index) => (
                    <div className={"card-wrapper"} key={index}>
                        <ExpandPost post={post} small={true}/>
                    </div>
                ))}
            </div>
        </div>
    )};

export default Archives;