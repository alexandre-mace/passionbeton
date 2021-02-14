import React, { useEffect } from 'react';
import getPosts from "../http/getPosts";
import {
    useRecoilState,
} from 'recoil';
import {postsAtom} from "../atom/postsAtom";

export function usePosts() {
    const [_postsPayload, setPostsPayload] = useRecoilState(postsAtom);

    useEffect(() => {
        getPosts()
            .then(response => {
                setPostsPayload({
                    data: response,
                    loading: false
                })
            });
    }, []);
}