import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
}

function ConfirmationModal({
    isOpen,
    onOpenChange,
    onConfirm,
    title,
    children,
}: ConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md max-w-xl bg-[#ffffff] rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-[#000000] text-center border-b border-[#eaeaea] ">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-700 pt-4">
                        {children}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-center space-x-4">
                    <Button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className="flex-1 bg-[#05d25d] hover:bg-[#04d361] text-white rounded-lg py-3">
                        Sim
                    </Button>
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="flex-1 bg-[#d30404] hover:bg-red-700 text-white rounded-lg py-3">
                        Não
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmationModal;
