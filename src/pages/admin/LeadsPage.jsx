// Admin Leads Page - View all customer registrations
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Search, Download, UserCheck, Mail, Phone, MapPin,
    Calendar, Filter, Eye, Trash2, RefreshCw, Globe,
    TrendingUp, UserPlus, Clock
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { LeadsStore } from '../../data/leadsStore';
import { exportLeadsToExcel } from '../../utils/leadsExport';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProvider, setFilterProvider] = useState('all');
    const [selectedLead, setSelectedLead] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadData();
        // Subscribe to changes
        const unsubscribe = LeadsStore.subscribe(() => loadData());
        return unsubscribe;
    }, []);

    const loadData = () => {
        setLeads(LeadsStore.getAllLeads());
        setStats(LeadsStore.getStats());
    };

    // Filter leads
    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone?.includes(searchQuery) ||
            lead.customer_id?.toString().includes(searchQuery);

        const matchesProvider =
            filterProvider === 'all' ||
            lead.auth_provider === filterProvider;

        return matchesSearch && matchesProvider;
    });

    // Export to Excel
    const handleExportExcel = () => {
        exportLeadsToExcel(filteredLeads);
    };

    // View lead details
    const handleViewLead = (lead) => {
        setSelectedLead(lead);
        setShowModal(true);
    };

    // Delete lead
    const handleDeleteLead = (customerId) => {
        if (confirm('Are you sure you want to delete this lead?')) {
            LeadsStore.deleteLead(customerId);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Stat Card Component
    const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-xl p-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">{label}</p>
                    <p className={`text-3xl font-bold ${color}`}>{value}</p>
                    {subtext && <p className="text-gray-500 text-xs mt-1">{subtext}</p>}
                </div>
                <div className={`w-12 h-12 rounded-xl ${color.replace('text-', 'bg-')}/20 flex items-center justify-center`}>
                    <Icon className={color} size={24} />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Customer Leads</h1>
                    <p className="text-gray-400">All registered customers and their details</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={loadData}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </Button>
                    <Button
                        className="gap-2 bg-success hover:bg-success/90"
                        onClick={handleExportExcel}
                    >
                        <Download size={16} />
                        Export to Excel
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Leads"
                    value={stats.total || 0}
                    color="text-primary"
                />
                <StatCard
                    icon={UserPlus}
                    label="Today"
                    value={stats.today || 0}
                    color="text-success"
                    subtext="New registrations"
                />
                <StatCard
                    icon={TrendingUp}
                    label="This Month"
                    value={stats.thisMonth || 0}
                    color="text-warning"
                />
                <StatCard
                    icon={UserCheck}
                    label="With Address"
                    value={stats.withAddress || 0}
                    color="text-secondary"
                    subtext="Profile complete"
                />
            </div>

            {/* Filters */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Provider Filter */}
                    <select
                        value={filterProvider}
                        onChange={(e) => setFilterProvider(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                    >
                        <option value="all" style={{ backgroundColor: '#1a1a1a' }}>All Sources</option>
                        <option value="email" style={{ backgroundColor: '#1a1a1a' }}>📧 Email Signup</option>
                        <option value="google" style={{ backgroundColor: '#1a1a1a' }}>🔵 Google Signup</option>
                    </select>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Customer ID</th>
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Name</th>
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Email</th>
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Phone</th>
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Location</th>
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Source</th>
                                <th className="text-left text-gray-400 font-medium px-6 py-4">Registered</th>
                                <th className="text-center text-gray-400 font-medium px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.length > 0 ? (
                                filteredLeads.map((lead, index) => (
                                    <motion.tr
                                        key={lead.customer_id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.02 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-primary font-mono font-bold">
                                                #{lead.customer_id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {lead.picture ? (
                                                    <img
                                                        src={lead.picture}
                                                        alt={lead.name}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <span className="text-primary font-bold text-sm">
                                                            {lead.name?.charAt(0)?.toUpperCase() || '?'}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="text-white font-medium">{lead.name || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-300">{lead.email}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-300">
                                                {lead.phone || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-400 text-sm">
                                                {lead.city && lead.country
                                                    ? `${lead.city}, ${lead.country}`
                                                    : lead.country || '-'
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.auth_provider === 'google'
                                                    ? 'bg-blue-500/20 text-blue-400'
                                                    : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {lead.auth_provider === 'google' ? '🔵 Google' : '📧 Email'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-400 text-sm">
                                                {formatDate(lead.created_at)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleViewLead(lead)}
                                                    className="p-2 rounded-lg hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLead(lead.customer_id)}
                                                    className="p-2 rounded-lg hover:bg-error/20 text-gray-400 hover:text-error transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center">
                                        <Users size={48} className="mx-auto text-gray-600 mb-4" />
                                        <p className="text-gray-400">No leads found</p>
                                        <p className="text-gray-500 text-sm">Leads will appear here when customers register</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        Showing {filteredLeads.length} of {leads.length} leads
                    </p>
                </div>
            </div>

            {/* Lead Details Modal */}
            {showModal && selectedLead && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Lead Details</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                                {selectedLead.picture ? (
                                    <img src={selectedLead.picture} alt="" className="w-16 h-16 rounded-full" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-primary font-bold text-2xl">
                                            {selectedLead.name?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="text-primary font-mono font-bold">#{selectedLead.customer_id}</p>
                                    <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                                </div>
                            </div>

                            <DetailRow icon={Mail} label="Email" value={selectedLead.email} />
                            <DetailRow icon={Phone} label="Phone" value={selectedLead.phone || 'Not provided'} />
                            <DetailRow icon={MapPin} label="Street" value={selectedLead.street || 'Not provided'} />
                            <DetailRow icon={MapPin} label="City" value={selectedLead.city || 'Not provided'} />
                            <DetailRow icon={MapPin} label="State" value={selectedLead.state || 'Not provided'} />
                            <DetailRow icon={MapPin} label="PIN Code" value={selectedLead.pincode || 'Not provided'} />
                            <DetailRow icon={Globe} label="Country" value={selectedLead.country || 'Not provided'} />
                            <DetailRow icon={Calendar} label="Registered" value={formatDate(selectedLead.created_at)} />
                            <DetailRow
                                icon={UserCheck}
                                label="Source"
                                value={selectedLead.auth_provider === 'google' ? '🔵 Google' : '📧 Email'}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

// Detail Row Component
const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon size={18} className="text-gray-400" />
        </div>
        <div>
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="text-white">{value}</p>
        </div>
    </div>
);

export default LeadsPage;
