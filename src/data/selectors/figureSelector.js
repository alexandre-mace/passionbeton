import {selectorFamily} from "recoil";
import {figuresAtom} from "../atom/figuresAtom";

const figureSelector = selectorFamily({
    key: 'figureSelector',
    get: (id) => ({get}) => {
        return get(figuresAtom).data.filter((figure) => figure.id === id);
    },

    set: (id) => ({set}, newValue) => {
        set(figuresAtom, (figuresAtomPayload) => {
            const figureIndex = figuresAtomPayload.data.findIndex((figureLoop) => figureLoop.id === id)
            let newFiguresData = [...figuresAtomPayload.data]
            newFiguresData.splice(figureIndex, 1, newValue)
            return {...figuresAtomPayload, data: newFiguresData}
        });
    },
});

export {figureSelector};