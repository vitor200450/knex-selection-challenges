import { Bell, ChevronDown, Home, MessageCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Header() {
    return (
        <header className="bg-[#ffffff] border-b border-b-black px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <img src="./konex-logo.png" alt="Konex Logo" />

                <nav className="flex items-center gap-8 text-lg">
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <Home size={20} />
                        <span>Início</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <Search size={20} />
                        <span>Buscar</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <Bell size={20} />
                        <span>Notificações</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#000000] hover:text-[#05d25d]">
                        <MessageCircle size={20} />
                        <span>Mensagens</span>
                    </button>
                </nav>

                <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown size={16} />
                </div>
            </div>
        </header>
    );
}

export default Header;
