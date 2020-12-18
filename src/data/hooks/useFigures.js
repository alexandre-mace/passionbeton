import React, { useEffect } from 'react';
import getFigures from "../http/getFigures";

export function useFigures() {
    const [figures, setFigures] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getFigures()
            .then(data => {
                setFigures(data)
                setLoading(false)
            });
    }, []);

    useEffect(() => {
        setLoading(false)
    }, [figures]);

    return {
        'figures': figures,
        'loading': loading
    };
}