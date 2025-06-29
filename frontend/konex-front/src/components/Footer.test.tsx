import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Componente Footer', () => {
    it('deve renderizar o texto de copyright corretamente', () => {
        render(<Footer />);

        const copyrightElement = screen.getByText(/© 2025 José Vitor/i);
        expect(copyrightElement).toBeInTheDocument();
    });

    it('deve renderizar os links de agradecimento', () => {
        render(<Footer />);

        const randomUserLink = screen.getByRole('link', {
            name: /RandomUser API/i,
        });
        const jsonPlaceholderLink = screen.getByRole('link', {
            name: /JSONPlaceholder API/i,
        });

        expect(randomUserLink).toBeInTheDocument();
        expect(jsonPlaceholderLink).toBeInTheDocument();
    });
});
