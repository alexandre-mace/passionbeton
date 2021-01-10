import React, { useState } from 'react';
import Figure from "../figure/Figure";
import FiguresHeader from "../figure/FIguresHeader";

const Figures = ({ figuresProp }) => {
    const [figures, setFigures] = useState(figuresProp);

    return (
        <div>
            <FiguresHeader/>
            {figures.map((figure, index) => (
                <div className={"card-wrapper"} key={index}>
                    <Figure figure={figure} small={true}/>
                </div>
            ))}
        </div>
    )};

export default Figures;