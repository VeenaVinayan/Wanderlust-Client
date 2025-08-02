import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface CancellationPolicyProps {
    refundable: boolean;
    refundPercentage?: number;
    allowedUntilDaysBefore?: number;
    cancellationFee?: number;
    terms?: string;
}

export default function CancellationPolicy({
    refundable,
    refundPercentage,
    allowedUntilDaysBefore,
    cancellationFee,
    terms,
}: CancellationPolicyProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <div className="p-4 bg-white rounded-xl shadow max-w-lg">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleOpen}
            >
                <h5 className="text-md font-semibold text-gray-600">Cancellation Policy</h5>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                ) : (
                    <ChevronDown className="w-5 h-5" />
                )}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4"
                    >
                        {refundable ? (
                            <ul className="space-y-2">
                                {refundPercentage !== undefined && (
                                    <li>
                                        <span className="font-medium">Refund Percentage:</span> {refundPercentage}%
                                    </li>
                                )}
                                {allowedUntilDaysBefore !== undefined && (
                                    <li>
                                        <span className="font-medium">Cancellation Allowed Until:</span> {allowedUntilDaysBefore} days before trip
                                    </li>
                                )}
                                {cancellationFee !== undefined && (
                                    <li>
                                        <span className="font-medium">Cancellation Fee:</span> {cancellationFee}%
                                    </li>
                                )}
                                {terms && (
                                    <li>
                                        <span className="font-medium">Terms:</span> {terms}
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <p>This package is non-refundable.</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
