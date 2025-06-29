import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Post from './Post';

describe('Componente Post', () => {
    const mockPostProps = {
        authorName: 'João Ninguém',
        authorAvatarUrl: 'http://example.com/avatar.png',
        authorLocation: 'São Paulo, SP',
        postedAt: 'Há 5 minutos',
        title: 'Título do Post de Teste',
        content: 'Este é o conteúdo do post que estamos testando.',
        likeCount: 123,
        commentCount: 45,
        isLiked: false,
        onLike: vi.fn(),
    };

    it('deve renderizar os dados do post corretamente', () => {
        render(<Post {...mockPostProps} />);

        expect(screen.getByText('João Ninguém')).toBeInTheDocument();
        expect(screen.getByText('Título do Post de Teste')).toBeInTheDocument();
        expect(
            screen.getByText('Este é o conteúdo do post que estamos testando.')
        ).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument(); // Likes
        expect(screen.getByText('45')).toBeInTheDocument(); // Comentários
    });

    it('deve mostrar os botões de editar e deletar quando isOwner for true', () => {
        render(<Post {...mockPostProps} isOwner={true} />);

        const editButton = screen.getByRole('button', { name: /editar post/i });
        const deleteButton = screen.getByRole('button', {
            name: /deletar post/i,
        });

        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it('não deve mostrar os botões de editar e deletar quando isOwner for false', () => {
        render(<Post {...mockPostProps} isOwner={false} />);

        const editButton = screen.queryByRole('button', { name: /edit/i });
        const deleteButton = screen.queryByRole('button', { name: /trash/i });

        expect(editButton).not.toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();
    });
});
