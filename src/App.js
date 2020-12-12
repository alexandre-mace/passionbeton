import './App.css';
import React from 'react';
import {BottomNavigation, BottomNavigationAction, makeStyles} from "@material-ui/core";
import Latest from "./components/Latest";
import Archives from "./components/Archives";
import Figures from "./components/Figures";

const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 70
    },
});
const App = () => {
    const classes = useStyles();
    const [mode, setMode] = React.useState(0);

    return (
        <div>
            {mode === 0 && <Latest/>}
            {mode === 1 && <Archives/>}
            {mode === 2 && <Figures/>}
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
    )};

export default App;
