import { SiGithub, SiLinkedin } from 'react-icons/si';

function Footer() {
    return (
        <footer className="bg-[#ffffff] border-t border-t-black py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-start">
                <div className="flex flex-col items-center gap-2">
                    <img
                        src="./konex-logo-mono.png"
                        alt="Konex Logo Monochromatic"
                    />
                    <p className="text-sm text-gray-500">© 2025 José Vitor</p>
                </div>

                <div className="flex flex-col items-center text-center text-xl">
                    <h3 className="font-bold text-[#000000] mb-3">
                        SOBRE ESTE PROJETO
                    </h3>
                    <div className="flex flex-col items-center space-y-2 text-base text-gray-600">
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-black">
                            <SiGithub size={24} />
                            Ver o código no GitHub
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-black">
                            <SiLinkedin size={24} />
                            Perfil no LinkedIn
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center text-xl">
                    <h3 className="font-bold text-[#000000] mb-3">
                        AGRADECIMENTOS
                    </h3>
                    <div className="flex flex-col space-y-2 text-base text-gray-600">
                        <a href="#" className="hover:text-black">
                            RandomUser API
                        </a>
                        <a href="#" className="hover:text-black">
                            JSONPlaceholder API
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
