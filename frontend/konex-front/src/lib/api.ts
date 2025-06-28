import axios from 'axios';

const randomUserApi = axios.create({
    baseURL: 'https://randomuser.me/api',
});

const jsonPlaceholderApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchUser = async (seed?: string) => {
    const params = new URLSearchParams({
        nat: 'br',
    });

    if (seed) {
        params.append('seed', seed);
    }

    const { data } = await randomUserApi.get(`/?${params.toString()}`);
    return data.results[0];
};

export const fetchPosts = async () => {
    const { data } = await jsonPlaceholderApi.get('/posts?_limit=10');
    return data;
};

export const fetchUsers = async () => {
    const { data } = await randomUserApi.get('/?results=10&nat=br');
    return data.results;
};

export const createPost = async (postData: {
    title: string;
    body: string;
    userId: number;
}) => {
    const { data } = await jsonPlaceholderApi.post('/posts', postData);
    return data;
};

export const updatePost = async (postData: {
    id: number;
    title: string;
    body: string;
}) => {
    const { data } = await jsonPlaceholderApi.put(
        `/posts/${postData.id}`,
        postData
    );
    return data;
};

export const deletePost = async (postId: number) => {
    const { data } = await jsonPlaceholderApi.delete(`/posts/${postId}`);
    return data;
};
