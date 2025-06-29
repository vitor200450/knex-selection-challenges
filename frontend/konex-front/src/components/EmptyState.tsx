import { Inbox } from 'lucide-react';
import * as React from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl border border-black h-96 mt-6">
            {icon || <Inbox className="w-16 h-16 text-gray-400 mb-4" />}
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-500 mt-2">{description}</p>
        </div>
    );
}

export default EmptyState;
