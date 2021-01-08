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
import {useWindowSize} from "react-use";
import TopNavigation from "./components/TopNavigation";
import DesktopLatest from "./components/modes/DesktopLatest";
import DesktopArchives from "./components/modes/DesktopArchives";
import DesktopFigures from "./components/modes/DesktopFigures";

const App = () => {
    const [mode, setMode] = React.useState(0);
    const latestPosts = useLatestPost().posts
    const latestPostsLoading = useLatestPost().loading
    const posts = usePosts().posts
    const postsLoading = usePosts().loading
    const figures = useFigures().figures
    const figuresLoading = useFigures().loading
    const { width, height } = useWindowSize()

    return (
        <div>
            {(width >= 800 && mode !==0) && <TopNavigation mode={mode} setMode={setMode}/>}
            {(latestPostsLoading || postsLoading || figuresLoading) && <Loader/>}
            {(!latestPostsLoading && latestPosts && latestPosts.length > 0 && mode === 0) &&
                (<>
                    {width < 800 && <Latest postsProp={latestPosts}/>}
                    {width >= 800 && <DesktopLatest postsProp={latestPosts} mode={mode} setMode={setMode}/>}
                </>)
            }
            {(!postsLoading && posts && posts.length > 0 && mode === 1) &&
                (<>
                    {width < 800 && <Archives postsProp={posts}/>}
                    {width >= 800 && <DesktopArchives postsProp={posts}/>}
                </>)

            }
            {(!figuresLoading && figures && figures.length > 0 && mode === 2) &&
                (<>
                    {width < 800 && <Figures figuresProp={figures}/>}
                    {width >= 800 && <DesktopFigures figuresProp={figures}/>}
                </>)
            }
            {width < 800 && <BottomNavigation mode={mode} setMode={setMode}/>}
        </div>
    )};

export default App;