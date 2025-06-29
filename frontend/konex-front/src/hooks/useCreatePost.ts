import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/api';
import { type ApiPost } from './usePosts';
import { useToast } from './use-toast';

const USER_POSTS_KEY = 'user_posts';

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

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

            toast({
                title: 'Sucesso!',
                description: 'Seu post foi criado e adicionado ao feed.',
            });
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Erro!',
                description: 'Não foi possível criar o seu post.',
            });
        },
    });
};
