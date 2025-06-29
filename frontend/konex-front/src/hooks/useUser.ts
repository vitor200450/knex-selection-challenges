import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { fetchUser } from '@/lib/api';
import { useEffect, useState } from 'react';

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
    const [seed, setSeed] = useState(() => Cookies.get(USER_TOKEN_COOKIE));

    const queryResult = useQuery({
        queryKey: ['user', seed],
        queryFn: () => fetchUser(seed),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24,
    });

    useEffect(() => {
        if (queryResult.isSuccess && queryResult.data && !seed) {
            const newSeed = queryResult.data.login.sha256;
            Cookies.set(USER_TOKEN_COOKIE, newSeed, { expires: 7 });
            setSeed(newSeed);
        }
    }, [queryResult.isSuccess, queryResult.data, seed]);

    return queryResult;
};
