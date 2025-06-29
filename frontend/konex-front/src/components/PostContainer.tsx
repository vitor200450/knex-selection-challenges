import Post from './Post';
import { useState, useEffect } from 'react';
import { usePosts, type ApiPost } from '@/hooks/usePosts';
import { useUsers, type ApiUser } from '@/hooks/useUsers';
import { useUser } from '@/hooks/useUser';
import EditPostModal from './EditPostModal';
import { useDeletePost } from '@/hooks/useDeletePost';
import ConfirmationModal from './ConfirmationModal';
import Spinner from './Spinner';
import EmptyState from './EmptyState';
import { ServerCrash } from 'lucide-react';

interface PostInteractionState {
    [postId: number]: {
        likeCount: number;
        isLiked: boolean;
        commentCount: number;
    };
}

function PostContainer() {
    const {
        data: posts,
        isLoading: isLoadingPosts,
        isError: isErrorPosts,
    } = usePosts();

    const {
        data: users,
        isLoading: isLoadingUsers,
        isError: isErrorUsers,
    } = useUsers();

    const { data: loggedInUser } = useUser();

    const [editingPost, setEditingPost] = useState<ApiPost | null>(null);
    const [deletingPostId, setDeletingPostId] = useState<number | null>(null);
    const deletePostMutation = useDeletePost();

    const [userMap, setUserMap] = useState<Map<number, ApiUser>>(new Map());
    const [interactionStates, setInteractionStates] =
        useState<PostInteractionState>({});

    useEffect(() => {
        if (users) {
            const map = new Map<number, ApiUser>();
            // A API JSONPlaceholder usa userId de 1 a 10.
            users.forEach((user, index) => {
                map.set(index + 1, user);
            });
            setUserMap(map);
        }
    }, [users]);

    useEffect(() => {
        if (posts) {
            const initialStates: PostInteractionState = {};
            posts.forEach((post) => {
                const isNewlyCreated = post.id > 100;
                initialStates[post.id] = {
                    likeCount: isNewlyCreated
                        ? 0
                        : Math.floor(Math.random() * 100),
                    isLiked: false,
                    commentCount: isNewlyCreated
                        ? 0
                        : Math.floor(Math.random() * 20),
                };
            });
            setInteractionStates(initialStates);
        }
    }, [posts]);

    const handleEdit = (post: ApiPost) => {
        setEditingPost(post);
    };

    const handleDelete = (postId: number) => {
        setDeletingPostId(postId);
    };

    const handleLike = (postId: number) => {
        setInteractionStates((prevStates) => {
            const currentState = prevStates[postId];
            const newLikedState = !currentState.isLiked;
            const newLikeCount = newLikedState
                ? currentState.likeCount + 1
                : currentState.likeCount - 1;

            return {
                ...prevStates,
                [postId]: {
                    ...currentState,
                    likeCount: newLikeCount,
                    isLiked: newLikedState,
                },
            };
        });
    };

    const confirmDelete = () => {
        if (deletingPostId) {
            deletePostMutation.mutate(deletingPostId);
        }
    };

    if (isLoadingPosts || isLoadingUsers) {
        return (
            <div className="flex justify-center items-center h-96">
                <Spinner className="w-10 h-10" />
            </div>
        );
    }

    if (isErrorPosts || isErrorUsers || !posts || !users) {
        return (
            <EmptyState
                title="Ocorreu um erro"
                description="Não foi possível carregar os posts. Por favor, tente novamente mais tarde."
                icon={<ServerCrash className="w-16 h-16 text-red-500 mb-4" />}
            />
        );
    }

    if (posts.length === 0) {
        return (
            <EmptyState
                title="Nenhum post encontrado"
                description="Parece que não há nada aqui. Que tal criar o primeiro post?"
            />
        );
    }

    return (
        <>
            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4">
                {posts.map((post, index) => {
                    const isNewlyCreated = post.id > 100;
                    const author = !isNewlyCreated
                        ? userMap.get(post.userId)
                        : null;

                    const authorName = isNewlyCreated
                        ? `${loggedInUser?.name.first} ${loggedInUser?.name.last}`
                        : author
                          ? `${author.name.first} ${author.name.last}`
                          : 'Usuário Desconhecido';

                    const authorAvatarUrl = isNewlyCreated
                        ? loggedInUser?.picture.large
                        : author?.picture.thumbnail;

                    const authorLocation = isNewlyCreated
                        ? `${loggedInUser?.location.city}, ${loggedInUser?.location.state}`
                        : author
                          ? `${author.location.city}, ${author.location.state}`
                          : 'Local Desconhecido';

                    const interactionState = interactionStates[post.id] || {
                        likeCount: 0,
                        isLiked: false,
                        commentCount: 0,
                    };

                    return (
                        <Post
                            key={post.id}
                            style={{ animationDelay: `${index * 100}ms` }}
                            title={post.title}
                            content={post.body}
                            authorName={authorName}
                            authorAvatarUrl={
                                authorAvatarUrl || '/placeholder.svg'
                            }
                            authorLocation={authorLocation}
                            postedAt="Há pouco tempo"
                            likeCount={interactionState.likeCount}
                            commentCount={interactionState.commentCount}
                            isOwner={isNewlyCreated}
                            onEdit={() => handleEdit(post)}
                            onDelete={() => handleDelete(post.id)}
                            isLiked={interactionState.isLiked}
                            onLike={() => handleLike(post.id)}
                        />
                    );
                })}
            </div>
            <EditPostModal
                post={editingPost}
                isOpen={!!editingPost}
                onOpenChange={() => setEditingPost(null)}
            />
            <ConfirmationModal
                isOpen={!!deletingPostId}
                onOpenChange={() => setDeletingPostId(null)}
                onConfirm={confirmDelete}
                title="Exclusão do seu post">
                <p>Tem certeza que quer excluir esta postagem?</p>
                <p className="font-semibold">Esta ação é irreversível!</p>
            </ConfirmationModal>
        </>
    );
}

export default PostContainer;
