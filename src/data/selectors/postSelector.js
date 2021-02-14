import {selectorFamily} from "recoil";
import {postsAtom} from "../atom/postsAtom";

const postSelector = selectorFamily({
    key: 'postSelector',
    get: (id) => ({get}) => {
        return get(postsAtom).data.filter((post) => post.id === id);
    },

    set: (id) => ({set}, newValue) => {
        set(postsAtom, (postsAtomPayload) => {
            const postIndex = postsAtomPayload.data.findIndex((postLoop) => postLoop.id === id)
            let newPostsData = [...postsAtomPayload.data]
            newPostsData.splice(postIndex, 1, newValue)
            return {...postsAtomPayload, data: newPostsData}
        });
    },
});

export {postSelector};