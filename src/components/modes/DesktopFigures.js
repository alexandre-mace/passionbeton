import React, { useState } from 'react';
import Figure from "../Figure";
import FiguresHeader from "../FIguresHeader";

const DesktopFigures = ({ figuresProp }) => {
    const [figures, setFigures] = useState(figuresProp);

    return (
        <div>
            <FiguresHeader/>
            <div className={"row"}>
                {figures.map((figure, index) => (
                    <div className={"card-wrapper col-6"} key={index}>
                        <Figure figure={figure}/>
                    </div>
                ))}
            </div>
        </div>
    )};

export default DesktopFigures;