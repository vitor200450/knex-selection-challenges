import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, MessageSquare, Share2, Trash2, Edit3 } from 'lucide-react';

interface PostProps {
    authorName: string;
    authorAvatarUrl: string;
    postedAt: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    isOwner?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

function Post({
    authorName,
    authorAvatarUrl,
    postedAt,
    title,
    content,
    likeCount,
    commentCount,
    isOwner = false,
    onEdit,
    onDelete,
}: PostProps) {
    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('');

    return (
        <Card className="bg-[#ffffff] border border-black rounded-2xl overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={authorAvatarUrl} />
                            <AvatarFallback className="bg-red-400 text-white">
                                {getInitials(authorName)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-[#000000]">
                                {authorName}
                            </h3>
                            <p className="text-sm text-gray-500">{postedAt}</p>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="flex items-center gap-10">
                            <button
                                onClick={onEdit}
                                className="text-gray-600 hover:text-[#05d25d]">
                                <Edit3 size={24} />
                            </button>
                            <button
                                onClick={onDelete}
                                className="text-gray-600 hover:text-red-500">
                                <Trash2 size={24} />
                            </button>
                        </div>
                    )}
                </div>

                <h2 className="text-lg font-bold text-[#000000] mb-3">
                    {title}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">{content}</p>

                <div className="flex items-center gap-8">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#05d25d]">
                        <ThumbsUp size={18} />
                        <span>{likeCount}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#05d25d]">
                        <MessageSquare size={18} />
                        <span>{commentCount}</span>
                    </button>
                    <button className="ml-auto text-gray-600 hover:text-[#05d25d]">
                        <Share2 size={18} />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

export default Post;
