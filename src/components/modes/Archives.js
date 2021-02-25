import React, {useState} from 'react';
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";
import Post from "../post/types/mobile/Post";

const Archives = ({ posts, searchDefault = '' }) => {
    const [search, setSearch] = useState(searchDefault);

    return (
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
            {[...posts].filter(post => filterPosts(search.split(' '), post)).map((post, index) => (
                <Post
                    post={post}
                    small={true}
                    key={index}
                    id={index}
                />
            ))}
        </div>
    )};

export default Archives;