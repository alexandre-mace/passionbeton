import React from 'react';
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 70
    },
});
const BottomNavigation = ({mode, setMode}) => {
    const classes = useStyles();

    return (
        <div>
            <MuiBottomNavigation
                value={mode}
                onChange={(event, newValue) => {
                    setMode(newValue);
                }}
                className={classes.root}
            >
                <BottomNavigationAction label={<div className={"dot"}/>} icon={<div>News</div>} />
                <BottomNavigationAction label={<div className={"dot"}/>} icon={<div>Archives</div>} />
                <BottomNavigationAction label={<div className={"dot"}/>} icon={<div>Figures</div>} />
            </MuiBottomNavigation>
        </div>
    )};

export default BottomNavigation;
