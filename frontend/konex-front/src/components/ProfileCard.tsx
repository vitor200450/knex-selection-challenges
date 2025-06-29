import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Calendar, MapPin, Phone } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import Spinner from './Spinner';
import EmptyState from './EmptyState';
import { ServerCrash } from 'lucide-react';
import { useState, useEffect } from 'react';

function ProfileCard() {
    const { data: user, isLoading, isError } = useUser();
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    useEffect(() => {
        if (user) {
            const followersKey = `followers_${user.login.sha256}`;
            const followingKey = `following_${user.login.sha256}`;

            let storedFollowers = localStorage.getItem(followersKey);
            let storedFollowing = localStorage.getItem(followingKey);

            if (!storedFollowers) {
                storedFollowers = Math.floor(Math.random() * 2000).toString();
                localStorage.setItem(followersKey, storedFollowers);
            }
            if (!storedFollowing) {
                storedFollowing = Math.floor(Math.random() * 1000).toString();
                localStorage.setItem(followingKey, storedFollowing);
            }

            setFollowers(parseInt(storedFollowers, 10));
            setFollowing(parseInt(storedFollowing, 10));
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="w-full lg:w-96 flex justify-center items-center h-96">
                <Spinner className="w-10 h-10" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <EmptyState
                title="Ocorreu um erro"
                description="Não foi possível carregar os dados do seu perfil. Por favor, tente novamente mais tarde."
                icon={<ServerCrash className="w-16 h-16 text-red-500 mb-4" />}
            />
        );
    }

    const getInitials = (name: { first: string; last: string }) =>
        `${name.first[0]}${name.last[0]}`;

    return (
        <div className="w-full lg:w-96">
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
                                {followers}
                            </div>
                            <div className="text-sm text-gray-600">
                                seguidores
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#000000]">
                                {following}
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
