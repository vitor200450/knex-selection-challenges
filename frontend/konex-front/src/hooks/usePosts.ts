import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api';

export interface ApiPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const USER_POSTS_KEY = 'user_posts';

export const usePosts = () => {
    const queryFn = async () => {
        const apiPosts = await fetchPosts();
        const localPosts: ApiPost[] = JSON.parse(
            localStorage.getItem(USER_POSTS_KEY) || '[]'
        );

        return [...localPosts, ...apiPosts];
    };

    return useQuery<ApiPost[]>({
        queryKey: ['posts'],
        queryFn: queryFn,
    });
};
