import './App.css';
import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import {BottomNavigation, BottomNavigationAction, makeStyles, MobileStepper} from "@material-ui/core";

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

const getDomain = (url) => {
    var matches = url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    var domain = matches && matches[1];  // domain will be null if no match is found

    if (domain !== null) {
        return domain
    }

    return 'lien invalide'
}

const App = () => {
    const classes = useStyles();

    const [view, setView] = useState(1);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [mode, setMode] = React.useState(0);

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
        <div>
            {loading && <div className={"overflow-hidden m-auto full-height d-flex"}><div className={"m-auto"}>Passion Béton</div></div>}
            {!loading &&
                <div>
                    <div className={"header"}>
                        <div className={"header-title"}>Cool de se revoir !</div>
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
                            <div key={index} style={Object.assign({}, styles.slide)}>
                                <div className="card">
                                    <div>{post.description}</div>
                                    <br/><br/>
                                    <a href={post.link} target={"_blank"} rel={"noreferrer"}><div className={"button" + (getDomain(post.link) === 'lien invalide' ? " disabled" : "")}>Lire</div></a>
                                    <div className={"domain-helper"}>(vers {getDomain(post.link)})</div>
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
                    </BindKeyboardSwipeableViews>
                    <BottomNavigation
                        value={mode}
                        onChange={(event, newValue) => {
                            setMode(newValue);
                        }}
                        className={classes.root}
                    >
                        <BottomNavigationAction label={<div className={"dot"}></div>} icon={<div>News</div>} />
                        <BottomNavigationAction label={<div className={"dot"}></div>} icon={<div>Archives</div>} />
                        <BottomNavigationAction label={<div className={"dot"}></div>} icon={<div>Figures</div>} />
                    </BottomNavigation>
                </div>
                
            }
        </div>
    )};

export default App;
