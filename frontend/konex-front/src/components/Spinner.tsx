import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
    className?: string;
}

function Spinner({ className }: SpinnerProps) {
    return <Loader2 className={cn('animate-spin text-[#05d25d]', className)} />;
}

export default Spinner;
