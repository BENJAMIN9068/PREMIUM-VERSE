// Profit Indicator Component - Reusable profit display with color coding
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getProfitStatus } from '../../data/productStore';

const ProfitIndicator = ({
    profitAmount,
    profitPercentage,
    showAmount = true,
    showPercentage = true,
    size = 'default', // 'small', 'default', 'large'
    variant = 'badge' // 'badge', 'inline', 'card'
}) => {
    const status = getProfitStatus(profitPercentage);

    const colorClasses = {
        loss: 'bg-error/10 text-error border-error/20',
        low: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        high: 'bg-success/10 text-success border-success/20'
    };

    const bgClasses = {
        loss: 'bg-error/20',
        low: 'bg-orange-500/20',
        medium: 'bg-yellow-500/20',
        high: 'bg-success/20'
    };

    const textClasses = {
        loss: 'text-error',
        low: 'text-orange-400',
        medium: 'text-yellow-400',
        high: 'text-success'
    };

    const sizeClasses = {
        small: 'text-xs px-1.5 py-0.5',
        default: 'text-sm px-2 py-1',
        large: 'text-base px-3 py-1.5'
    };

    const Icon = profitPercentage < 0 ? TrendingDown :
        profitPercentage < 20 ? Minus : TrendingUp;

    if (variant === 'inline') {
        return (
            <span className={`inline-flex items-center gap-1 ${textClasses[status.status]}`}>
                <Icon size={size === 'small' ? 12 : 14} />
                {showAmount && <span className="font-medium">₹{Math.abs(profitAmount)}</span>}
                {showPercentage && (
                    <span className="opacity-75">({profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(1)}%)</span>
                )}
                {status.status === 'loss' && <AlertTriangle size={12} className="ml-1" />}
            </span>
        );
    }

    if (variant === 'card') {
        return (
            <div className={`rounded-xl p-4 ${bgClasses[status.status]} border ${colorClasses[status.status].split(' ')[2]}`}>
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${textClasses[status.status]}`}>
                        {status.label}
                    </span>
                    <Icon size={18} className={textClasses[status.status]} />
                </div>
                {showAmount && (
                    <p className={`text-2xl font-bold ${textClasses[status.status]}`}>
                        {profitAmount >= 0 ? '+' : ''}₹{profitAmount.toLocaleString('en-IN')}
                    </p>
                )}
                {showPercentage && (
                    <p className={`text-sm opacity-75 ${textClasses[status.status]}`}>
                        {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(1)}% margin
                    </p>
                )}
            </div>
        );
    }

    // Default badge variant
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border ${colorClasses[status.status]} ${sizeClasses[size]}`}>
            {status.status === 'loss' && <AlertTriangle size={size === 'small' ? 10 : 12} />}
            {showAmount && (
                <span className="font-medium">
                    {profitAmount >= 0 ? '+' : ''}₹{Math.abs(profitAmount)}
                </span>
            )}
            {showPercentage && (
                <span className={showAmount ? 'opacity-75' : 'font-medium'}>
                    {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(1)}%
                </span>
            )}
        </span>
    );
};

// Live Profit Calculator Preview Box (for forms)
export const ProfitPreviewBox = ({ providerCost, sellingPrice }) => {
    const cost = parseFloat(providerCost) || 0;
    const price = parseFloat(sellingPrice) || 0;
    const profitAmount = price - cost;
    const profitPercentage = cost > 0 ? ((profitAmount / cost) * 100) : 0;
    const status = getProfitStatus(profitPercentage);

    const statusConfig = {
        loss: {
            bg: 'from-error/20 to-error/5',
            border: 'border-error/30',
            icon: '❌',
            message: 'You will make a LOSS!'
        },
        low: {
            bg: 'from-orange-500/20 to-orange-500/5',
            border: 'border-orange-500/30',
            icon: '⚠️',
            message: 'Low profit margin'
        },
        medium: {
            bg: 'from-yellow-500/20 to-yellow-500/5',
            border: 'border-yellow-500/30',
            icon: '📊',
            message: 'Medium profit margin'
        },
        high: {
            bg: 'from-success/20 to-success/5',
            border: 'border-success/30',
            icon: '✅',
            message: 'Good profit margin!'
        }
    };

    const config = statusConfig[status.status];

    return (
        <div className={`rounded-xl p-4 bg-gradient-to-br ${config.bg} border ${config.border} transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{config.icon}</span>
                <h4 className="font-bold text-white">PROFIT PREVIEW</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-gray-400 mb-1">Profit Amount</p>
                    <p className={`text-xl font-bold ${profitAmount >= 0 ? 'text-success' : 'text-error'}`}>
                        {profitAmount >= 0 ? '+' : ''}₹{profitAmount.toFixed(0)}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">Profit Margin</p>
                    <p className={`text-xl font-bold ${profitPercentage >= 0 ? 'text-success' : 'text-error'}`}>
                        {profitPercentage.toFixed(1)}%
                    </p>
                </div>
            </div>

            <p className={`mt-3 text-sm font-medium ${status.status === 'loss' ? 'text-error' :
                    status.status === 'low' ? 'text-orange-400' :
                        status.status === 'medium' ? 'text-yellow-400' : 'text-success'
                }`}>
                {config.message}
            </p>
        </div>
    );
};

export default ProfitIndicator;
