import React, {useState, useEffect} from 'react';
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";
import Post from "../post/types/mobile/Post";

const Archives = ({ posts }) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        document.getElementsByClassName('MuiBottomNavigation-root')[0].style.position = 'fixed'
    }, [])

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
            {[...posts].slice(0, 5).filter(post => filterPosts(search.split(' '), post)).map((post, index) => (
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