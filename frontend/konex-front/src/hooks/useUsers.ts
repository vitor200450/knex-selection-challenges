import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/lib/api';

export interface ApiUser {
    name: {
        first: string;
        last: string;
    };
    picture: {
        thumbnail: string;
    };
    location: {
        city: string;
        state: string;
    };
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
};
