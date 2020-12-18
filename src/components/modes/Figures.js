import React, { useState } from 'react';
import Figure from "../Figure";

const Figures = ({ figuresProp }) => {
    const [figures, setFigures] = useState(figuresProp);

    return (
        <div>
            <div className={"header"}>
                <div className={"header-title"}>Les figures <span className="emoji">🗣️</span></div>
                <div className={"header-subtitle"}>Voici toutes les figures des passionés de béton.</div>
            </div>
            {figures.map((figure, index) => (
                <div className={"card-wrapper"} key={index}>
                    <Figure figure={figure} small={true}/>
                </div>
            ))}
        </div>
    )};

export default Figures;