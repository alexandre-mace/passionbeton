import React, { useState } from 'react';
import Figure from "../Figure";
import FiguresHeader from "../FIguresHeader";

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