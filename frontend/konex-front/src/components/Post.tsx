import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    ThumbsUp,
    MessageSquare,
    Share2,
    Trash2,
    Edit3,
    MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface PostProps {
    authorName: string;
    authorAvatarUrl: string;
    authorLocation: string;
    postedAt: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    isOwner?: boolean;
    isLiked: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onLike: () => void;
    style?: React.CSSProperties;
}

function Post({
    authorName,
    authorAvatarUrl,
    authorLocation,
    postedAt,
    title,
    content,
    likeCount,
    commentCount,
    isOwner = false,
    isLiked,
    onEdit,
    onDelete,
    onLike,
    style,
}: PostProps) {
    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('');

    return (
        <Card
            className="bg-[#ffffff] border border-black rounded-2xl overflow-hidden opacity-0 animate-fade-in-up"
            style={style}>
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
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{postedAt}</span>
                                <span className="text-gray-300">•</span>
                                <MapPin size={12} className="inline" />
                                <span>{authorLocation}</span>
                            </div>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="flex items-center gap-10">
                            <button
                                onClick={onEdit}
                                aria-label="Editar post"
                                className="text-gray-600 hover:text-[#05d25d]">
                                <Edit3 size={24} />
                            </button>
                            <button
                                onClick={onDelete}
                                aria-label="Deletar post"
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
                    <button
                        onClick={onLike}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#05d25d]">
                        <ThumbsUp
                            size={18}
                            className={cn(
                                isLiked && 'fill-current text-[#05d25d]'
                            )}
                        />
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
