import React, { useEffect } from 'react';
import getPosts from "../http/getPosts";

export function usePosts() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getPosts()
            .then(data => {
                setPosts(data)
                setLoading(false)
            });
    }, []);

    useEffect(() => {
        setLoading(false)
    }, [posts]);

    return {
        'posts': posts,
        'loading': loading
    };
}