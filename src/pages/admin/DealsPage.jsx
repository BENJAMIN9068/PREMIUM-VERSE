// Admin Deals Page - Manage Today's Deals
import { useState, useEffect } from 'react';
import {
    Plus, Edit2, Trash2, Eye, EyeOff, Star, Zap, Calendar,
    ShoppingCart, Gift, AlertTriangle, Clock
} from 'lucide-react';
import Button from '../../components/ui/Button';
import DealFormModal from '../../components/admin/DealFormModal';
import { DealsStore, calculateDealSavings, getDealConditionText, isDealExpiringSoon } from '../../data/dealsStore';

const DealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState(null);

    useEffect(() => {
        setDeals(DealsStore.getAllDeals());
        const unsubscribe = DealsStore.subscribe((updatedDeals) => {
            setDeals([...updatedDeals]);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setSelectedDeal(null);
        setIsModalOpen(true);
    };

    const handleEdit = (deal) => {
        setSelectedDeal(deal);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this deal?')) {
            DealsStore.deleteDeal(id);
        }
    };

    const handleToggleActive = (id) => {
        DealsStore.toggleActive(id);
    };

    const handleToggleFeatured = (id) => {
        DealsStore.toggleFeatured(id);
    };

    const getDealStatus = (deal) => {
        const today = new Date().toISOString().split('T')[0];
        if (!deal.is_active) return { label: 'Inactive', color: 'bg-gray-500/10 text-gray-400' };
        if (deal.start_date > today) return { label: 'Scheduled', color: 'bg-primary/10 text-primary' };
        if (deal.end_date < today) return { label: 'Expired', color: 'bg-error/10 text-error' };
        if (isDealExpiringSoon(deal)) return { label: 'Ending Soon', color: 'bg-warning/10 text-warning' };
        return { label: 'Active', color: 'bg-success/10 text-success' };
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#1a1a1a]/40 border border-white/5 p-4 lg:p-6 rounded-2xl backdrop-blur-md">
                <div>
                    <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                        <Zap className="text-warning" size={28} />
                        Today's Deals
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Create special offers with conditional pricing
                    </p>
                </div>
                <Button onClick={handleAddNew} className="gap-2">
                    <Plus size={16} /> Create New Deal
                </Button>
            </header>

            {/* Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a]/40 border border-white/5 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Total Deals</p>
                    <p className="text-3xl font-bold text-white">{deals.length}</p>
                </div>
                <div className="bg-[#1a1a1a]/40 border border-success/20 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Active Deals</p>
                    <p className="text-3xl font-bold text-success">
                        {deals.filter(d => d.is_active).length}
                    </p>
                </div>
                <div className="bg-[#1a1a1a]/40 border border-warning/20 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Featured Deals</p>
                    <p className="text-3xl font-bold text-warning">
                        {deals.filter(d => d.is_featured).length}
                    </p>
                </div>
            </section>

            {/* Deals Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {deals.map((deal) => {
                    const savings = calculateDealSavings(deal);
                    const condition = getDealConditionText(deal);
                    const status = getDealStatus(deal);
                    const isFree = deal.deal_price === 0;

                    return (
                        <div
                            key={deal.id}
                            className={`bg-[#1a1a1a]/40 border ${deal.is_featured ? 'border-warning/30' : 'border-white/5'} rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300`}
                        >
                            {/* Deal Header */}
                            <div className="relative p-4 bg-gradient-to-br from-warning/10 to-transparent">
                                {deal.is_featured && (
                                    <div className="absolute top-2 left-2 bg-warning text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Star size={10} className="fill-current" /> FEATURED
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="mt-6 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-black/30 rounded-xl flex items-center justify-center">
                                        {deal.product_image ? (
                                            <img src={deal.product_image} alt="" className="h-10 w-auto" />
                                        ) : (
                                            <Gift size={24} className="text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{deal.product_name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-gray-400 line-through text-sm">₹{deal.original_price}</span>
                                            <span className={`text-xl font-bold ${isFree ? 'text-success' : 'text-warning'}`}>
                                                {isFree ? 'FREE!' : `₹${deal.deal_price}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deal Details */}
                            <div className="p-4 space-y-3">
                                {/* Savings Badge */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                                        Save ₹{savings.savings} ({savings.percentage}% OFF)
                                    </span>
                                </div>

                                {/* Condition */}
                                {condition && (
                                    <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
                                        <ShoppingCart size={14} />
                                        {condition}
                                    </div>
                                )}

                                {/* Duration */}
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Calendar size={12} />
                                    {deal.start_date} → {deal.end_date}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                                    <button
                                        onClick={() => handleToggleActive(deal.id)}
                                        className={`p-2 rounded-lg transition-colors ${deal.is_active
                                                ? 'text-success hover:bg-success/10'
                                                : 'text-gray-500 hover:bg-white/5'
                                            }`}
                                        title={deal.is_active ? 'Deactivate' : 'Activate'}
                                    >
                                        {deal.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleToggleFeatured(deal.id)}
                                        className={`p-2 rounded-lg transition-colors ${deal.is_featured
                                                ? 'text-warning hover:bg-warning/10'
                                                : 'text-gray-500 hover:bg-white/5'
                                            }`}
                                        title={deal.is_featured ? 'Remove featured' : 'Make featured'}
                                    >
                                        <Star size={18} className={deal.is_featured ? 'fill-current' : ''} />
                                    </button>
                                    <div className="flex-1"></div>
                                    <button
                                        onClick={() => handleEdit(deal)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        title="Edit deal"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deal.id)}
                                        className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                        title="Delete deal"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Empty State */}
                {deals.length === 0 && (
                    <div className="col-span-full text-center py-16 bg-[#1a1a1a]/40 border border-white/5 rounded-2xl">
                        <Zap size={48} className="mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-400 mb-4">No deals created yet</p>
                        <Button onClick={handleAddNew} className="gap-2">
                            <Plus size={16} /> Create Your First Deal
                        </Button>
                    </div>
                )}
            </section>

            {/* Modal */}
            <DealFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                deal={selectedDeal}
                onSave={() => { }}
            />
        </div>
    );
};

export default DealsPage;
