import React, { useState } from 'react';
import FiguresHeader from "../figure/FIguresHeader";
import DesktopExpandFigure from "../DesktopExpandFigure";

const DesktopFigures = ({ figuresProp }) => {
    const [figures, setFigures] = useState(figuresProp);

    return (
        <div>
            <FiguresHeader/>
            <div className={"row"}>
                {figures.map((figure, index) => (
                    <div className={"card-wrapper col-6"} key={index}>
                        <DesktopExpandFigure figure={figure}/>
                    </div>
                ))}
            </div>
        </div>
    )};

export default DesktopFigures;