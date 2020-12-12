import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import {makeStyles, MobileStepper} from "@material-ui/core";
import SeenAll from "./SeenAll";
import Post from "./Post";

const axios = require('axios');
const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 70
    },
});
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
    slide: {
        marginTop: 20,
        marginBottom: 50,
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

const Latest = () => {
    const classes = useStyles();

    const [view, setView] = useState(1);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://wd2q3hrfr4-rycbhpqkvnz7k.eu.s5y.io/posts/latest')
            .then(function (response) {
                setPosts(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className={"overflow-hidden"}>
            {loading && <div className={"overflow-hidden m-auto full-height d-flex"}><div className={"m-auto"}>Passion Béton</div></div>}
            {!loading &&
            <div>
                <div className={"header"}>
                    <div className={"header-title"}><div>Cool de se revoir ! <span className="emoji">👋</span></div> </div>
                    <div className={"header-subtitle"}>Voici les derniers partages par les passionés de béton.</div>
                </div>
                <MobileStepper
                    variant="progress"
                    steps={posts.length + 1}
                    position="static"
                    activeStep={view - 1}
                    className={classes.root}
                    style={{backgroundColor: 'transparent', borderRadius: 16, height: 20}}
                    nextButton={
                        <div>
                        </div>
                    }
                    backButton={
                        <div>
                        </div>
                    }
                />
                <BindKeyboardSwipeableViews enableMouseEvents={true} index={view - 1} onChangeIndex={(index, indexLatest, meta) => {
                    setView(index + 1)
                }}>
                    {posts.map((post, index) => (
                        <div className={"card-wrapper"} key={index} style={Object.assign({}, styles.slide)}>
                            <Post post={post}/>
                        </div>
                    ))}
                    <div style={Object.assign({}, styles.slide)}>
                        <SeenAll/>
                    </div>
                </BindKeyboardSwipeableViews>
            </div>

            }
        </div>
    )};

export default Latest;
