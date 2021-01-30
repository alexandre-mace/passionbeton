import React from 'react';

const FigureContent = ({figure}) => {
    return (
        <div className={"figure-content"} style={{marginBottom: "1.6rem"}}
        >
            {figure.description &&
                <>{figure.description.substring(0, 130)}{figure.description.length > 125 && '...' }</>
            }
        </div>
    )
}

export default FigureContent;