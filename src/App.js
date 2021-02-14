import './App.css';
import React, {useEffect, useState} from 'react';
import Latest from "./components/modes/Latest";
import Archives from "./components/modes/Archives";
import Figures from "./components/modes/Figures";
import BottomNavigation from "./components/navigation/BottomNavigation";
import Loader from "./components/loaders/Loader";
import {useLatestPost} from "./data/hooks/useLatestPosts";
import {usePosts} from "./data/hooks/usePosts";
import {useFigures} from "./data/hooks/useFigures";
import {useWindowSize} from "react-use";
import TopNavigation from "./components/navigation/TopNavigation";
import DesktopLatest from "./components/modes/DesktopLatest";
import DesktopArchives from "./components/modes/DesktopArchives";
import DesktopFigures from "./components/modes/DesktopFigures";
import { getToken, onMessageListener } from './firebase';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {postsAtom} from "./data/atom/postsAtom";
import {figuresAtom} from "./data/atom/figuresAtom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
    const [mode, setMode] = React.useState(0);
    const [isTokenFound, setTokenFound] = useState(false);
    const [newNotficiation, setNewNotification] = useState(false);
    const { width, height } = useWindowSize()
    const {data: posts, loading: postsLoading} = useRecoilValue(postsAtom);
    const {data: figures, loading: figuresLoading} = useRecoilValue(figuresAtom);
    usePosts();
    useFigures();

    useEffect(() => {
        getToken(setTokenFound);

        onMessageListener().then(payload => {
            setNewNotification(payload);
        }).catch(err => console.log('failed: ', err));
    }, [])

    useEffect(() => {
        if (width < 800 && mode === 0) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [mode])

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNewNotification(false);
    };

    return (
        <div>
            {(width >= 800 && mode !==0) && <TopNavigation mode={mode} setMode={setMode}/>}
            {(postsLoading || figuresLoading) && <Loader/>}
            {(!postsLoading && posts.length > 0 && mode === 0) &&
                (<>
                    {width < 800 && <Latest posts={[...posts].slice(0, 5)}/>}
                    {width >= 800 && <DesktopLatest posts={[...posts].slice(0, 5)} mode={mode} setMode={setMode}/>}
                </>)
            }
            {(!postsLoading && posts && posts.length > 0 && mode === 1) &&
                (<>
                    {width < 800 && <Archives posts={posts}/>}
                    {width >= 800 && <DesktopArchives posts={[...posts]}/>}
                </>)
            }
            {(!figuresLoading && figures && figures.length > 0 && mode === 2) &&
                (<>
                    {width < 800 && <Figures figures={figures}/>}
                    {width >= 800 && <DesktopFigures figures={figures}/>}
                </>)
            }
            {width < 800 && <BottomNavigation mode={mode} setMode={setMode}/>}
            {(width >= 800 && !postsLoading) && <div id="custom-cursor"/>}
            {newNotficiation &&
            <Snackbar open={newNotficiation !== false} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity="success">
                    {newNotficiation.notification.body}
                </Alert>
            </Snackbar>
            }
        </div>
    )}

export default App;