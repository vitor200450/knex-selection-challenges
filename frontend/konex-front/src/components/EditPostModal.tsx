import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { type ApiPost } from '@/hooks/usePosts';

const postSchema = z.object({
    title: z.string().min(5, 'O título precisa ter no mínimo 5 caracteres.'),
    body: z.string().min(10, 'O conteúdo precisa ter no mínimo 10 caracteres.'),
});

type PostFormData = z.infer<typeof postSchema>;

interface EditPostModalProps {
    post: ApiPost | null;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

function EditPostModal({ post, isOpen, onOpenChange }: EditPostModalProps) {
    const updatePostMutation = useUpdatePost();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    useEffect(() => {
        if (post) {
            reset({ title: post.title, body: post.body });
        }
    }, [post, reset]);

    const onSubmit = (data: PostFormData) => {
        if (!post) return;

        updatePostMutation.mutate(
            { ...data, id: post.id, userId: post.userId },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#ffffff] max-w-xl mx-auto rounded-2xl border border-[#eaeaea]">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-[#000000] text-center border-b border-[#eaeaea] pb-4">
                        Edite os detalhes do seu post
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 p-6">
                    <div>
                        <Label
                            htmlFor="title"
                            className="block text-sm font-medium text-[#000000] mb-2">
                            Título
                        </Label>
                        <Input
                            id="title"
                            {...register('title')}
                            className="border border-[#eaeaea] rounded-lg"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            htmlFor="body"
                            className="block text-sm font-medium text-[#000000] mb-2">
                            Conteúdo do Post
                        </Label>
                        <Textarea
                            id="body"
                            {...register('body')}
                            className="border border-[#eaeaea] rounded-lg min-h-[120px] resize-none"
                        />
                        {errors.body && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.body.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={updatePostMutation.isPending}
                        className="w-full bg-[#05d25d] hover:bg-[#04d361] text-[#ffffff] rounded-lg py-3 font-medium">
                        {updatePostMutation.isPending
                            ? 'Salvando...'
                            : 'Salvar Alterações'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditPostModal;
