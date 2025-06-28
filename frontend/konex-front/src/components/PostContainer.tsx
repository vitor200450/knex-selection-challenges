import Post from './Post';
import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { useUsers } from '@/hooks/useUsers';
import { useUser } from '@/hooks/useUser';
import EditPostModal from './EditPostModal';
import { useDeletePost } from '@/hooks/useDeletePost';
import ConfirmationModal from './ConfirmationModal';

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

    const handleEdit = (post: ApiPost) => {
        setEditingPost(post);
    };

    const handleDelete = (postId: number) => {
        setDeletingPostId(postId);
    };

    const confirmDelete = () => {
        if (deletingPostId) {
            deletePostMutation.mutate(deletingPostId);
        }
    };

    if (isLoadingPosts || isLoadingUsers) {
        return <div>Carregando posts...</div>;
    }

    if (isErrorPosts || isErrorUsers || !posts || !users) {
        return <div>Erro ao carregar os posts.</div>;
    }

    return (
        <>
            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4">
                {posts.map((post, index) => {
                    const isNewlyCreated = post.id > 100;
                    const author = !isNewlyCreated ? users[index] : null;

                    const authorName = isNewlyCreated
                        ? `${loggedInUser?.name.first} ${loggedInUser?.name.last}`
                        : author
                          ? `${author.name.first} ${author.name.last}`
                          : 'Usuário Desconhecido';

                    const authorAvatarUrl = isNewlyCreated
                        ? loggedInUser?.picture.large
                        : author?.picture.thumbnail;
                    return (
                        <Post
                            key={post.id}
                            title={post.title}
                            content={post.body}
                            authorName={authorName}
                            authorAvatarUrl={
                                authorAvatarUrl || '/placeholder.svg'
                            }
                            postedAt="Há pouco tempo"
                            likeCount={
                                isNewlyCreated
                                    ? 0
                                    : Math.floor(Math.random() * 100)
                            }
                            commentCount={
                                isNewlyCreated
                                    ? 0
                                    : Math.floor(Math.random() * 20)
                            }
                            isOwner={isNewlyCreated}
                            onEdit={() => handleEdit(post)}
                            onDelete={() => handleDelete(post.id)}
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
