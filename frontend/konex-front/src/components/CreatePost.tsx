import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreatePost } from '@/hooks/useCreatePost';

const postSchema = z.object({
    title: z.string().min(5, 'O título precisa ter no mínimo 5 caracteres.'),
    body: z.string().min(10, 'O conteúdo precisa ter no mínimo 10 caracteres.'),
});

type PostFormData = z.infer<typeof postSchema>;

function CreatePost() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const createPostMutation = useCreatePost();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const onSubmit = (data: PostFormData) => {
        createPostMutation.mutate(
            { ...data, userId: 1 },
            {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#000000]">
                    Posts para você
                </h1>
                <DialogTrigger asChild>
                    <Button
                        variant="success"
                        className="rounded-2xl px-4 py-2 hover:bg-[#04d361]">
                        <PlusCircle size={20} className="mr-2" />
                        Criar Novo Post
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent className="bg-[#ffffff] max-w-xl mx-auto rounded-2xl border border-[#eaeaea]">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-[#000000] text-center border-b border-[#eaeaea] pb-4">
                        Insira os detalhes do seu post
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
                            placeholder="Digite o título aqui..."
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
                            placeholder="Insira o conteúdo do seu post aqui..."
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
                        disabled={createPostMutation.isPending}
                        className="w-full bg-[#05d25d] hover:bg-[#04d361] text-[#ffffff] rounded-lg py-3 font-medium">
                        {createPostMutation.isPending
                            ? 'Criando...'
                            : 'Criar novo post'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreatePost;
