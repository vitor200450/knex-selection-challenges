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
}

export const useUsers = () => {
    return useQuery<ApiUser[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
};
