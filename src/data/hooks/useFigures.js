import React, { useEffect } from 'react';
import getFigures from "../http/getFigures";
import {
    useRecoilState,
} from 'recoil';
import {figuresAtom} from "../atom/figuresAtom";

export function useFigures() {
    const [_figuresPayload, setFiguresPayload] = useRecoilState(figuresAtom);

    useEffect(() => {
        getFigures()
            .then(response => {
                setFiguresPayload({
                    data: response,
                    loading: false
                })
            });
    }, []);
}