import React from 'react';
import {Skeleton} from "@material-ui/lab";

const LatestLoader = () => {
    return (
        <div className={"overflow-hidden m-auto full-height d-flex loader"}>
            <div className={"m-auto"}>
                {/*<Skeleton variant="rect" width={'70vw'} height={200} />*/}
            </div>
        </div>
    )};

export default LatestLoader;
