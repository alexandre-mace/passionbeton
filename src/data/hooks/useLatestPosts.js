import React, { useEffect } from 'react';
import getLatestPosts from "../http/getLatestPosts";

export function useLatestPost() {
    const [latestPosts, setLatestPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getLatestPosts()
            .then(data => {
                setLatestPosts(data)
                setLoading(false)
            });
    }, []);

    useEffect(() => {
        setLoading(false)
    }, [latestPosts]);

    return {
        latestPosts,
        loading
    };
}