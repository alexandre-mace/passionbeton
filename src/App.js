import './App.css';
import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
const axios = require('axios');

const styles = {
    slide: {
        padding: 15,
        minHeight: '100vh',
        color: '#fff',
        display: "flex",
        position: "relative"
    },
    slide1: {
    },
    slide2: {
    },
    slide3: {
    },
};

const App = () => {
    const [view, setView] = useState(1);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://cors-anywhere.herokuapp.com/' + 'https://wd2q3hrfr4-rycbhpqkvnz7k.eu.s5y.io/posts')
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
            {loading && 'Chargement'}
            {!loading &&
                <div>
                    {view <= posts.length &&
                        <div className={"label"}>{view}/{posts.length}</div>
                    }

                    <SwipeableViews index={view - 1} onChangeIndex={(index, indexLatest, meta) => {
                        setView(index + 1)
                    }}>
                        {posts.map((post) => (
                            <div style={Object.assign({}, styles.slide)}>
                                <div className={"m-auto"}>
                                    <div className="card">
                                        <div>{post.description}</div>
                                        <br/><br/>
                                        <a href={post.link}>{post.link}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div style={Object.assign({}, styles.slide)}>
                            <div className={"m-auto"}>
                                <div className="card d-flex">
                                    <div className="m-auto">
                                        À jour !
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
            }
        </div>
    )};

export default App;
