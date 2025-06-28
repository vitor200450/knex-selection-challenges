import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/lib/api';
import { type ApiPost } from './usePosts';

const USER_POSTS_KEY = 'user_posts';

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    const mutationFn = async (postId: number) => {
        if (postId > 100) {
            return Promise.resolve();
        }

        return deletePost(postId);
    };

    return useMutation({
        mutationFn,
        onSuccess: (_, postId) => {
            if (postId > 100) {
                const localPosts: ApiPost[] = JSON.parse(
                    localStorage.getItem(USER_POSTS_KEY) || '[]'
                );
                const updatedLocalPosts = localPosts.filter(
                    (p) => p.id !== postId
                );
                localStorage.setItem(
                    USER_POSTS_KEY,
                    JSON.stringify(updatedLocalPosts)
                );
            }

            queryClient.setQueryData(
                ['posts'],
                (oldData: ApiPost[] | undefined) => {
                    if (!oldData) return [];
                    return oldData.filter((post) => post.id !== postId);
                }
            );
        },
    });
};
