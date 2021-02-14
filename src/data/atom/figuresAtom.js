import {
    atom,
} from 'recoil';

const figuresAtom = atom({
    key: 'figures',
    default: {
        data: [],
        loading: true
    },
});

export {figuresAtom}