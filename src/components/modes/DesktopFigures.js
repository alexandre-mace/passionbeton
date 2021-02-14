import React, { useState } from 'react';
import FiguresHeader from "../headers/FIguresHeader";
import DesktopExpandFigure from "../figure/DesktopExpandFigure";

const DesktopFigures = ({ figures }) => {

    return (
        <div>
            <FiguresHeader/>
            <div className={"row"}>
                {[...figures].reverse().map((figure, index) => (
                    <div className={"card-wrapper col-6"} key={index}>
                        <DesktopExpandFigure figure={figure}/>
                    </div>
                ))}
            </div>
        </div>
    )};

export default DesktopFigures;