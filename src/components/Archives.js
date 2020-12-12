import React, { useState, useEffect } from 'react';
import Loader from "./Loader";
import Post from "./Post";
const axios = require('axios');

const Archives = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://wd2q3hrfr4-rycbhpqkvnz7k.eu.s5y.io/posts')
            .then(function (response) {
                setPosts(response.data)
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
