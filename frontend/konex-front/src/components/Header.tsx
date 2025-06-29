import {
    Bell,
    ChevronDown,
    Home,
    MessageCircle,
    Search,
    Menu,
    X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

function Header() {
    const { data: user } = useUser();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getInitials = (name: { first: string; last: string }) =>
        `${name.first[0]}${name.last[0]}`;

    return (
        <header className="bg-[#ffffff] border-b border-b-black px-4 md:px-6 py-3 relative">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <img
                    src="./konex-logo.png"
                    alt="Konex Logo"
                    className="h-8 w-auto"
                />

                {/* Barra de navegação no DESKTOP */}
                <nav className="hidden sm:flex items-center gap-4 md:gap-8 text-lg">
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <Home size={20} />
                        <span className="hidden lg:inline">Início</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <Search size={20} />
                        <span className="hidden lg:inline">Buscar</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <Bell size={20} />
                        <span className="hidden lg:inline">Notificações</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <MessageCircle size={20} />
                        <span className="hidden lg:inline">Mensagens</span>
                    </button>
                </nav>

                <div className="flex items-center gap-4">
                    {/* Avatar no DESKTOP */}
                    <div className="hidden sm:flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={user?.picture.large} />
                            <AvatarFallback>
                                {user ? getInitials(user.name) : 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <ChevronDown size={16} />
                    </div>

                    {/* Botão no MOBILE */}
                    <button
                        className="sm:hidden p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Abrir menu">
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Painel de Menu no MOBILE */}
            {isMobileMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
                    <nav className="flex flex-col p-4 gap-4">
                        <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d] p-2 rounded-md">
                            <Home size={20} />
                            <span>Início</span>
                        </button>
                        <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d] p-2 rounded-md">
                            <Search size={20} />
                            <span>Buscar</span>
                        </button>
                        <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d] p-2 rounded-md">
                            <Bell size={20} />
                            <span>Notificações</span>
                        </button>
                        <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d] p-2 rounded-md">
                            <MessageCircle size={20} />
                            <span>Mensagens</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
