import React, { useState, useEffect } from 'react';
import Loader from "./Loader";
import Post from "./Post";
const axios = require('axios');

const Archives = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [search, setSearch] = useState('');

    const filterPosts = (terms, item) => {
        return terms.every(term =>
            ['tags', 'author', 'description', 'link', 'createdAt']
                .some(attribute => {
                    if (item[attribute] !== null) {
                        if (typeof item[attribute] !== 'object') {
                            return item[attribute] && item[attribute].toLowerCase().includes(term.toLowerCase())
                        } else {
                            return item[attribute].some(attribute => {
                                return attribute && attribute.toLowerCase().includes(term.toLowerCase())
                            })
                        }
                    }
                }))
    }

    useEffect(() => {
        setPosts(allPosts.filter(post => filterPosts(search.split(' '), post)))
    }, [search]);

    useEffect(() => {
        axios.get('https://wd2q3hrfr4-rycbhpqkvnz7k.eu.s5y.io/posts')
            .then(function (response) {
                setPosts(response.data)
                setAllPosts(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {loading && <Loader/>}
            {!loading &&
            <div>
                <div className={"header"}>
                    <div className={"header-title"}>Les archives <span className="emoji">🗄️</span></div>
                    <div className={"header-subtitle"}>Voici tous les partages par les passionés de béton.</div>
                </div>
                    <div className={"archive-search"}>
                        <input type="text" placeholder={"Rechercher dans les archives"} value={search} onChange={(event => {setSearch(event.target.value)})} />
                    </div>
                    {posts.map((post, index) => (
                        <div className={"card-wrapper"} key={index}>
                            <Post post={post} small={true}/>
                        </div>
                    ))}
            </div>
            }
        </div>
    )};

export default Archives;
