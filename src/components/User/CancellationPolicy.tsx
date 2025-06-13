// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircle } from 'lucide-react';

// export interface CancellationPolicyProps {
//     refundable: boolean;
//     refundPercentage?: number;
//     allowedUntilDaysBefore?: number;
//     cancellationFee?: number;
//     terms?: string;
// }

// export default function CancellationPolicy({ refundable, refundPercentage, allowedUntilDaysBefore, cancellationFee, terms }: CancellationPolicyProps) {
//     const [activeItem, setActiveItem] = useState<string | null>(null);

//     const handleToggle = (itemKey: string) => {
//         setActiveItem(prev => (prev === itemKey ? null : itemKey));
//     };

//     return (
//         <div className="p-4 bg-white rounded-xl shadow max-w-lg m-5">
//             <h4 className="text-xl font-semibold mb-4">Cancellation Policy</h4>

//             {refundable ? (
//                 <ul className="space-y-3">
//                     {[
//                         { key: 'refundable', label: 'Refundable: Yes', detail: 'You can cancel this package within the allowed window.' },
//                         refundPercentage !== undefined && { key: 'refundPercentage', label: `Refund Percentage: ${refundPercentage}%`, detail: `You will get back ${refundPercentage}% of the paid amount.` },
//                         allowedUntilDaysBefore !== undefined && { key: 'allowedUntilDaysBefore', label: `Cancellation Allowed Until: ${allowedUntilDaysBefore} days before trip`, detail: `You must cancel at least ${allowedUntilDaysBefore} days before your trip date.` },
//                         cancellationFee !== undefined && { key: 'cancellationFee', label: `Cancellation Fee: $${cancellationFee}`, detail: `A fee of $${cancellationFee} will be deducted from the refund.` },
//                         terms && { key: 'terms', label: `Terms`, detail: terms },
//                     ]
//                         .filter(Boolean)
//                         .map(item => (
//                             <li
//                                 key={item!.key}
//                                 className="flex items-start gap-2 cursor-pointer"
//                                 onClick={() => handleToggle(item!.key)}
//                             >
//                                 <CheckCircle className="text-green-500 mt-1" />
//                                 <div>
//                                     <p className="font-medium">{item!.label}</p>
//                                     <AnimatePresence>
//                                         {activeItem === item!.key && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, height: 0 }}
//                                                 animate={{ opacity: 1, height: 'auto' }}
//                                                 exit={{ opacity: 0, height: 0 }}
//                                                 className="text-sm text-gray-600 mt-1"
//                                             >
//                                                 {item!.detail}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </li>
//                         ))}
//                 </ul>
//             ) : (
//                 <div className="flex items-start gap-2">
//                     <CheckCircle className="text-green-500 mt-1" />
//                     <p className="font-medium">This package is non-refundable.</p>
//                 </div>
//             )}
//         </div>
//     );
// }

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
                <h5 className="text-md font-semibold text-gray-600">Policy</h5>
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
