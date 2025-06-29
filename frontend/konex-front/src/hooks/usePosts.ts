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

        // Simulação de variação de autores - O JSON Placeholder usa o mesmo usuário para todos os posts
        const diversifiedApiPosts = apiPosts.map((post, index) => ({
            ...post,
            userId: (index % 10) + 1, // Atribui userId de 1 a 10 ciclicamente
        }));

        return [...localPosts, ...diversifiedApiPosts];
    };

    return useQuery({
        queryKey: ['posts'],
        queryFn: queryFn,
    });
};
