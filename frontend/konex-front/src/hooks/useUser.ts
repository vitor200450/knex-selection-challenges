import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { fetchUser } from '@/lib/api';
import { useEffect } from 'react';

const USER_TOKEN_COOKIE = 'user_token';

export interface RandomUser {
    name: {
        first: string;
        last: string;
    };
    picture: {
        large: string;
    };
    email: string;
    dob: {
        age: number;
    };
    location: {
        city: string;
        state: string;
    };
    phone: string;
    login: {
        sha256: string;
    };
}

export const useUser = () => {
    const queryFn = () => {
        const seed = Cookies.get(USER_TOKEN_COOKIE);
        return fetchUser(seed);
    };

    const queryResult = useQuery({
        queryKey: ['user'],
        queryFn: queryFn,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24,
    });

    useEffect(() => {
        if (queryResult.data?.login?.sha256) {
            Cookies.set(USER_TOKEN_COOKIE, queryResult.data.login.sha256, {
                expires: 7,
            });
        }
    }, [queryResult.data]);

    return queryResult;
};
