import { useEffect, useState } from "react";

export default function useForumPosts(API_URL, forumId) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!API_URL || !forumId) {
            setPosts([]);
            setLoading(false);
            return;
        }

        const getPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${API_URL}/forums/${forumId}/posts`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const result = await response.json();
                    setPosts(result.data ?? []);
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.log(err);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, [API_URL, forumId]);

    return { posts, loading };
}