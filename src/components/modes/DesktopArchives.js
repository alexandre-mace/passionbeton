import React, { useState, useEffect } from 'react';
import ExpandPost from "../ExpandPost";
import filterPosts from "../../filters/filterPosts";

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
                <div className={"header"}>
                    <div className={"header-title"}>Les archives <span className="emoji">🗄️</span></div>
                    <div className={"header-subtitle"}>Voici tous les partages par les passionés de béton.</div>
                </div>
                <div className={"archive-search"}>
                    <input type="text" placeholder={"Rechercher dans les archives"} value={search} onChange={(event => {setSearch(event.target.value)})} />
                </div>
                <div className={"row"}>
                    {posts.map((post, index) => (
                        <div className={"card-wrapper col-6"} key={index}>
                            <ExpandPost post={post} small={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )};

export default Archives;