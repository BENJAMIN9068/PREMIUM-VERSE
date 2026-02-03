import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

const OrderCard = ({ order, index }) => {
    const [expanded, setExpanded] = useState(false);

    const statusConfig = {
        completed: { label: 'Completed', color: 'bg-success/20 text-success', icon: '✅' },
        processing: { label: 'Processing', color: 'bg-blue-500/20 text-blue-400', icon: '⏳' },
        delivered: { label: 'Delivered', color: 'bg-success/20 text-success', icon: '🚚' },
        cancelled: { label: 'Cancelled', color: 'bg-error/20 text-error', icon: '❌' },
        pending: { label: 'Pending', color: 'bg-warning/20 text-warning', icon: '⏸️' },
    };

    const paymentColors = {
        paid: 'text-success',
        pending: 'text-warning',
        failed: 'text-error',
        refunded: 'text-blue-400',
    };

    const status = statusConfig[order.orderStatus] || statusConfig.pending;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
        >
            {/* Main Row */}
            <div
                className="p-4 flex items-center gap-4 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Product Icon */}
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl shrink-0">
                    {order.productImage}
                </div>

                {/* Order Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-gray-400">{order.orderId}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status.color}`}>
                            {status.icon} {status.label}
                        </span>
                    </div>
                    <h4 className="text-white font-medium truncate">{order.productName}</h4>
                    <p className="text-xs text-gray-500">
                        {order.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">₹{order.amount}</p>
                    <p className={`text-xs ${paymentColors[order.paymentStatus]}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </p>
                </div>

                {/* Expand Icon */}
                <div className="text-gray-400 shrink-0">
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-white/10 p-4 bg-black/20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                            <p className="text-gray-500 text-xs">Payment Method</p>
                            <p className="text-gray-300">{order.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Transaction ID</p>
                            <p className="text-gray-300 font-mono text-xs">{order.transactionId}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Delivered At</p>
                            <p className="text-gray-300">
                                {order.deliveredAt
                                    ? order.deliveredAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                    : 'Pending'}
                            </p>
                        </div>
                        {order.refundAmount && (
                            <div>
                                <p className="text-gray-500 text-xs">Refund</p>
                                <p className="text-blue-400">₹{order.refundAmount}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button size="sm" variant="ghost" className="gap-2 text-xs">
                            <Download size={14} /> Invoice
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-2 text-xs">
                            <HelpCircle size={14} /> Support
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default OrderCard;
