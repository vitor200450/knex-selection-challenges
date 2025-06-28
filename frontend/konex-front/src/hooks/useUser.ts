import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { fetchUser } from '@/lib/api';

const USER_TOKEN_COOKIE = 'user_token';

interface RandomUser {
    name: {
        first: string;
        last: string;
    };
    email: string;
    login: {
        sha256: string;
    };
    dob: {
        age: number;
    };
    picture: {
        large: string;
    };
    phone: string;
    location: {
        city: string;
        state: string;
    };
}

export const useUser = () => {
    const queryFn = () => {
        const seed = Cookies.get(USER_TOKEN_COOKIE);
        return fetchUser(seed);
    };

    return useQuery<RandomUser>({
        queryKey: ['user'],
        queryFn: queryFn,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24,
        onSuccess: (data) => {
            if (data?.login?.sha256) {
                Cookies.set(USER_TOKEN_COOKIE, data.login.sha256, {
                    expires: 7,
                });
            }
        },
    });
};
