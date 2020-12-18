import React, { useEffect } from 'react';
import getLatestPosts from "../http/getLatestPosts";

export function useLatestPost() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getLatestPosts()
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