import './App.css';
import React from 'react';
import Latest from "./components/modes/Latest";
import Archives from "./components/modes/Archives";
import Figures from "./components/modes/Figures";
import BottomNavigation from "./components/BottomNavigation";
import Loader from "./components/Loader";
import {useLatestPost} from "./data/hooks/useLatestPosts";
import {usePosts} from "./data/hooks/usePosts";
import {useFigures} from "./data/hooks/useFigures";

const App = () => {
    const [mode, setMode] = React.useState(0);
    const latestPosts = useLatestPost().posts
    const latestPostsLoading = useLatestPost().loading
    const posts = usePosts().posts
    const postsLoading = usePosts().loading
    const figures = useFigures().figures
    const figuresLoading = useFigures().loading

    return (
        <div>
            {(latestPostsLoading || postsLoading || figuresLoading) && <Loader/>}
            {(!latestPostsLoading && latestPosts && latestPosts.length > 0 && mode === 0) && <Latest postsProp={latestPosts}/>}
            {(!postsLoading && posts && posts.length > 0 && mode === 1) && <Archives postsProp={posts}/>}
            {(!figuresLoading && figures && figures.length > 0 && mode === 2) && <Figures figuresProp={figures}/>}
            <BottomNavigation mode={mode} setMode={setMode}/>
        </div>
    )};

export default App;