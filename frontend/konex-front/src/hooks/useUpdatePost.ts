import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '@/lib/api';
import { type ApiPost } from './usePosts';
import { useToast } from './use-toast';

const USER_POSTS_KEY = 'user_posts';

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const mutationFn = async (postData: ApiPost) => {
        if (postData.id > 100) {
            return Promise.resolve(postData);
        }
        return updatePost(postData);
    };

    return useMutation({
        mutationFn,
        onSuccess: (updatedPost) => {
            if (updatedPost.id > 100) {
                const localPosts: ApiPost[] = JSON.parse(
                    localStorage.getItem(USER_POSTS_KEY) || '[]'
                );
                const updatedLocalPosts = localPosts.map((p) =>
                    p.id === updatedPost.id ? updatedPost : p
                );
                localStorage.setItem(
                    USER_POSTS_KEY,
                    JSON.stringify(updatedLocalPosts)
                );
            }

            queryClient.invalidateQueries({ queryKey: ['posts'] });

            toast({
                title: 'Sucesso!',
                description: 'Seu post foi editado e atualizado no feed.',
            });
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Erro!',
                description: 'Não foi possível atualizar o seu post.',
            });
        },
    });
};
