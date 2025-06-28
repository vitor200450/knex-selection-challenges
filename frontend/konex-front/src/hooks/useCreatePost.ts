import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/api';
import { type ApiPost } from './usePosts';

const USER_POSTS_KEY = 'user_posts';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            const localPosts: ApiPost[] = JSON.parse(
                localStorage.getItem(USER_POSTS_KEY) || '[]'
            );

            localStorage.setItem(
                USER_POSTS_KEY,
                JSON.stringify([newPost, ...localPosts])
            );

            queryClient.setQueryData(
                ['posts'],
                (oldData: ApiPost[] | undefined) => {
                    return oldData ? [newPost, ...oldData] : [newPost];
                }
            );
        },
    });
};
