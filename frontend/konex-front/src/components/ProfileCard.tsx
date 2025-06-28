import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Calendar, MapPin, Phone } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

function ProfileCard() {
    const { data: user, isLoading, isError } = useUser();

    if (isLoading) {
        return <div>Carregando perfil...</div>;
    }

    if (isError || !user) {
        return <div>Erro ao carregar perfil.</div>;
    }

    const getInitials = (name: { first: string; last: string }) =>
        `${name.first[0]}${name.last[0]}`;

    return (
        <div className="w-md">
            <Card className="bg-[#ffffff] border border-black rounded-2xl overflow-hidden">
                <CardContent className="p-6 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={user.picture.large} />
                        <AvatarFallback className="bg-blue-400 text-white text-2xl">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>

                    <h2 className="text-xl font-bold text-[#000000] mb-1">
                        {`${user.name.first} ${user.name.last}`}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Apaixonado por desenvolvimento web
                    </p>

                    <div className="space-y-3 text-left mb-6">
                        <div className="flex items-center gap-3">
                            <Mail className="text-[#05d25d]" size={24} />
                            <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="text-[#05d25d]" size={24} />
                            <span className="text-sm">{user.dob.age} anos</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-[#05d25d]" size={24} />
                            <span className="text-sm">{`${user.location.city} - ${user.location.state}`}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-[#05d25d]" size={24} />
                            <span className="text-sm">{user.phone}</span>
                        </div>
                    </div>

                    <div className="flex justify-around gap-8 pt-4 border-t border-black">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#000000]">
                                {Math.floor(Math.random() * 2000)}
                            </div>
                            <div className="text-sm text-gray-600">
                                seguidores
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#000000]">
                                {Math.floor(Math.random() * 1000)}
                            </div>
                            <div className="text-sm text-gray-600">
                                seguindo
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProfileCard;
