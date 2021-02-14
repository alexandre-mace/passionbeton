import {
    atom,
} from 'recoil';

const postsAtom = atom({
    key: 'posts',
    default: {
        data: [],
        loading: true
    },
});

export {postsAtom}