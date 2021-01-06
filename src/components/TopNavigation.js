import React from 'react';

const TopNavigation = ({mode, setMode}) => {
    return (
        <div className={"top-navigation"}>
            <div className={"top-navigation-item"} onClick={() => setMode(0)}>
                <div>News</div>
                <div className={"dot " + (mode === 0 ? 'opacity-1' : 'opacity-0')}/>
            </div>
            <div className={"top-navigation-item"} onClick={() => setMode(1)}>
                <div>Archives</div>
                <div className={"dot " + (mode === 1 ? 'opacity-1' : 'opacity-0')}/>
            </div>
            <div className={"top-navigation-item"} onClick={() => setMode(2)}>
                <div>Figures</div>
                <div className={"dot " + (mode === 2 ? 'opacity-1' : 'opacity-0')}/>
            </div>

        </div>
    )};

export default TopNavigation;
