import React, {useEffect, useState} from 'react';
import Figure from "../figure/Figure";
import FiguresHeader from "../headers/FIguresHeader";

const Figures = ({ figures }) => {

    return (
        <div>
            <FiguresHeader/>
            {[...figures].reverse().map((figure, index) => (
                <div className={"card-wrapper"} key={index}>
                    <Figure figure={figure} small={true}/>
                </div>
            ))}
        </div>
    )};

export default Figures;