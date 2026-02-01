import React, { useState } from 'react';
import { Edit2, Trash2, Filter, TrendingUp, TrendingDown, Briefcase, User, Calendar, Tag, FileText, ArrowRightLeft, ChevronRight } from 'lucide-react';

const TransactionList = ({ transactions, onEdit, onDelete, filters, setFilters }) => {
    const [showFilters, setShowFilters] = useState(false);

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    const categories = ['food', 'fuel', 'medical', 'movie', 'loan', 'salary', 'gift', 'other'];

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const isEditable = (createdAt) => {
        const createdTime = new Date(createdAt).getTime();
        const currentTime = new Date().getTime();
        return (currentTime - createdTime) / (1000 * 60 * 60) <= 12;
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Transactions</h2>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all ${showFilters
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    <span>{showFilters ? 'Hide Filters' : 'Filters'}</span>
                </button>
            </div>

            {showFilters && (
                <div className="glass p-6 rounded-3xl mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-row gap-4 overflow-x-auto">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Type</label>
                            <select
                                name="type"
                                className="input-field py-3 text-black font-bold bg-white w-full"
                                value={filters.type}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="transfer">Transfer</option>
                            </select>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Division</label>
                            <select
                                name="division"
                                className="input-field py-3 text-black font-bold bg-white w-full"
                                value={filters.division}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Divisions</option>
                                <option value="office">Office</option>
                                <option value="personal">Personal</option>
                            </select>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                            <select
                                name="category"
                                className="input-field py-3 text-black font-bold bg-white w-full"
                                value={filters.category}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">From Date</label>
                            <input
                                type="date"
                                name="from"
                                value={filters.from}
                                className="input-field py-3 text-sm text-black font-bold bg-white w-full"
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">To Date</label>
                            <input
                                type="date"
                                name="to"
                                value={filters.to}
                                min={filters.from}
                                className="input-field py-3 text-sm text-black font-bold bg-white w-full"
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="glass overflow-hidden rounded-[2rem] border border-white/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-5 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100">Transaction</th>
                                <th className="px-6 py-5 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100">Category</th>
                                <th className="px-6 py-5 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100">Account</th>
                                <th className="px-6 py-5 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100">Date</th>
                                <th className="px-6 py-5 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 text-right">Amount</th>
                                <th className="px-6 py-5 text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.map((t) => (
                                <tr key={t._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' :
                                                    t.type === 'expense' ? 'bg-rose-50 text-rose-600' :
                                                        'bg-blue-50 text-blue-600'
                                                }`}>
                                                {t.type === 'income' ? <TrendingUp className="w-5 h-5" /> :
                                                    t.type === 'expense' ? <TrendingDown className="w-5 h-5" /> :
                                                        <ArrowRightLeft className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <span className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors block leading-none">
                                                    {t.description}
                                                </span>
                                                <div className="flex items-center mt-1 text-[10px] font-black uppercase tracking-tight text-slate-400">
                                                    {t.division === 'office' ? <Briefcase className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                                    {t.division}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm font-bold text-slate-600 capitalize">
                                            <Tag className="w-4 h-4 mr-2 text-slate-400" />
                                            {t.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600 border border-slate-200">
                                                {t.fromAccount?.name || 'Deleted'}
                                            </span>
                                            {t.type === 'transfer' && (
                                                <>
                                                    <ChevronRight className="w-3 h-3 text-slate-300" />
                                                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600 border border-slate-200">
                                                        {t.toAccount?.name || 'Deleted'}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm font-bold text-slate-500">
                                            <Calendar className="w-4 h-4 mr-2 text-slate-300" />
                                            {formatDate(t.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className={`text-lg font-black ${t.type === 'income' ? 'text-emerald-600' :
                                                t.type === 'expense' ? 'text-rose-600' :
                                                    'text-blue-600'
                                            }`}>
                                            {t.type === 'income' ? '+' : t.type === 'expense' ? '-' : '⇄'}₹{t.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center space-x-1">
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-xl transition-all disabled:opacity-20"
                                                disabled={!isEditable(t.createdAt)}
                                                title={!isEditable(t.createdAt) ? "Editing locked after 12h" : "Edit"}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(t._id)}
                                                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-bold">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6 text-slate-200">
                            <FileText className="w-10 h-10" />
                        </div>
                        <p className="text-lg">No transactions found.</p>
                        <p className="text-sm font-medium mt-1">Try adjusting your filters or add a new entry.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
