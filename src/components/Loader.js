import React from 'react';
import ThreeDotsWave from "./ThreeDotsWave";

const Loader = () => {
    return (
            <div className={"overflow-hidden m-auto full-height d-flex loader"}>
                <div className={"m-auto bold"}>
                    <Grid>
                         <ThreeDotsWave />
                    </Grid>
                </div>
            </div>
)};

function Grid({ children }) {
    return (
        <div className="grid">
            <LoadingBox>{children}</LoadingBox>
        </div>
    );
}

function LoadingBox({ children }) {
    return React.Children.map(children, child => {
        return <div className="loading-box">{child}</div>;
    });
}

export default Loader;
