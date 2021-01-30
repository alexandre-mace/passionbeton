import React from 'react'
import {makeStyles, MobileStepper} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 4,
    },
});

const SwipeActions = ({postIndex, steps}) => {
    const classes = useStyles();

    return (
        <div className={"postindex-indicator"}>
            <MobileStepper
                variant="progress"
                steps={steps}
                position="static"
                activeStep={postIndex}
                className={classes.root}
                style={{backgroundColor: 'transparent', borderRadius: 16, height: 20, marginBottom: 10}}
                nextButton={<div/>}
                backButton={<div/>}
            />
        </div>
    )
}
export default SwipeActions