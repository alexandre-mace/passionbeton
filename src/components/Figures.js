import React, { useState, useEffect } from 'react';
import Loader from "./Loader";
import Figure from "./Figure";
const axios = require('axios');

const Figures = () => {
    const [loading, setLoading] = useState(true);
    const [figures, setFigures] = useState([]);

    useEffect(() => {
        axios.get('https://wd2q3hrfr4-rycbhpqkvnz7k.eu.s5y.io/figures')
            .then(function (response) {
                setFigures(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {loading && <Loader/>}
            {!loading &&
            <div>
                <div className={"header"}>
                    <div className={"header-title"}>Les figures</div>
                    <div className={"header-subtitle"}>Voici toutes les figures des passionés de béton.</div>
                </div>
                {figures.map((figure, index) => (
                    <div className={"card-wrapper"} key={index}>
                        <Figure figure={figure} small={true}/>
                    </div>
                ))}
            </div>
            }
        </div>
    )};

export default Figures;
