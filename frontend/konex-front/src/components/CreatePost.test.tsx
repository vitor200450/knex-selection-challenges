import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CreatePost from './CreatePost';
import * as useCreatePostHook from '@/hooks/useCreatePost';

type MockUseMutationResult = Pick<
    UseMutationResult<ApiPost, Error, { title: string; body: string }>,
    'mutate' | 'isPending'
>;

// Mock do hook useCreatePost
const mockMutate = vi.fn();
vi.spyOn(useCreatePostHook, 'useCreatePost').mockReturnValue({
    mutate: mockMutate,
    isPending: false,
} as MockUseMutationResult);

// Helper para renderizar com o QueryClientProvider
const queryClient = new QueryClient();
const renderComponent = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <CreatePost />
        </QueryClientProvider>
    );
};

describe('Componente CreatePost', () => {
    it('deve mostrar mensagens de erro ao tentar submeter com campos vazios', async () => {
        renderComponent();
        const user = userEvent.setup();

        const createButton = screen.getByRole('button', {
            name: /criar novo post/i,
        });
        await user.click(createButton);

        const submitButton = await screen.findByRole('button', {
            name: /criar novo post/i,
        });
        await user.click(submitButton);

        // Verifica se as mensagens de erro do Zod apareceram
        expect(
            await screen.findByText(
                'O título precisa ter no mínimo 5 caracteres.'
            )
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                'O conteúdo precisa ter no mínimo 10 caracteres.'
            )
        ).toBeInTheDocument();
    });

    it('deve chamar a função de mutação com os dados corretos ao submeter um formulário válido', async () => {
        renderComponent();
        const user = userEvent.setup();

        // Abre o modal
        const createButton = screen.getByRole('button', {
            name: /criar novo post/i,
        });
        await user.click(createButton);

        // Preenche os campos do formulário
        const titleInput =
            await screen.findByPlaceholderText(/digite o título aqui/i);
        const contentInput = await screen.findByPlaceholderText(
            /insira o conteúdo do seu post aqui/i
        );
        await user.type(titleInput, 'Meu Título de Teste');
        await user.type(
            contentInput,
            'Este é o conteúdo do meu post de teste.'
        );

        // Submete o formulário
        const submitButton = screen.getByRole('button', {
            name: /criar novo post/i,
        });
        await user.click(submitButton);

        // Verifica se a função `mutate` foi chamada com os dados corretos
        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith(
                {
                    title: 'Meu Título de Teste',
                    body: 'Este é o conteúdo do meu post de teste.',
                    userId: 1,
                },
                expect.any(Object) // Ignora o segundo argumento (callbacks)
            );
        });
    });
});
