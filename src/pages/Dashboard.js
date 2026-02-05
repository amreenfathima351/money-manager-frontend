import React, { useState, useEffect, useCallback } from 'react';
import { LogOut, Plus, Landmark, Wallet, CreditCard, PiggyBank } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { transactionService, accountService } from '../services/api';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import AccountModal from '../components/AccountModal';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [summary, setSummary] = useState({});
    const [catSummary, setCatSummary] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [period, setPeriod] = useState('daily');
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        division: '',
        from: '',
        to: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchSummaryData = useCallback(async () => {
        try {
            const params = {};
            const hasCustomDates = filters.from || filters.to;

            if (!hasCustomDates) {
                params.period = period;
            } else {
                if (filters.from) params.from = filters.from;
                if (filters.to) params.to = filters.to;
                else if (filters.from && !filters.to) {
                    params.to = new Date().toISOString().split('T')[0];
                }
            }

            console.log('📊 Fetching Summary Data with params:', params);
            console.log('📅 Current period:', period);
            console.log('📅 Custom filters:', filters);

            const [summaryRes, catRes] = await Promise.all([
                transactionService.getSummary(params),
                transactionService.getCategorySummary(params)
            ]);
            setSummary(summaryRes.data);
            setCatSummary(catRes.data);
        } catch (error) {
            console.error('Failed to fetch summary');
        }
    }, [period, filters]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTransactionData = useCallback(async (customFilters) => {
        try {
            const currentFilters = customFilters || filters;
            const params = { ...currentFilters };
            const hasCustomDates = params.from || params.to;

            if (!hasCustomDates) {
                params.period = period;
            } else if (params.from && !params.to) {
                params.to = new Date().toISOString().split('T')[0];
            }

            console.log('📋 Fetching Transaction Data with params:', params);

            const transRes = await transactionService.getAll(params);
            setTransactions(transRes.data);
            console.log('📋 Received transactions:', transRes.data.length, 'items');
        } catch (error) {
            console.error('Failed to fetch transactions');
        }
    }, [filters, period]);

    const fetchAccounts = useCallback(async () => {
        try {
            const res = await accountService.getAll();
            setAccounts(res.data);
        } catch (error) {
            console.error('Failed to fetch accounts');
        }
    }, []);

    // Effect for initial load and dashboard updates
    useEffect(() => {
        fetchSummaryData();
        fetchTransactionData();
        fetchAccounts();
    }, [fetchSummaryData, fetchTransactionData, fetchAccounts]);

    const handleAddOrEdit = async (data) => {
        try {
            if (editData) {
                await transactionService.update(editData._id, data);
                toast.success('Transaction updated');
            } else {
                await transactionService.add(data);
                toast.success('Transaction added');
            }
            fetchSummaryData();
            fetchTransactionData();
            fetchAccounts();
            setEditData(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    const handleAddAccount = async (data) => {
        try {
            await accountService.add(data);
            toast.success('Account created');
            fetchAccounts();
            fetchSummaryData();
        } catch (error) {
            toast.error('Failed to create account');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await transactionService.delete(id);
                toast.success('Transaction deleted');
                fetchSummaryData();
                fetchTransactionData();
                fetchAccounts();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const openEditModal = (data) => {
        setEditData(data);
        setIsModalOpen(true);
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        // Clear custom date filters when switching to period-based view
        setFilters(prev => ({
            ...prev,
            from: '',
            to: ''
        }));
    };

    const getAccountIcon = (type) => {
        switch (type) {
            case 'bank': return Landmark;
            case 'credit': return CreditCard;
            case 'savings': return PiggyBank;
            default: return Wallet;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Hello, {user?.name}!</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={period}
                        onChange={(e) => handlePeriodChange(e.target.value)}
                        className="input-field py-2 text-black font-semibold bg-white cursor-pointer"
                    >
                        <option value="daily">Today</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <button
                        onClick={logout}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Accounts Panel */}
            <section className="mb-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Your Accounts</h2>
                    <button
                        onClick={() => setIsAccountModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-bold transition-all rounded-lg hover:bg-blue-50"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Account</span>
                    </button>
                </div>

                {/* Accounts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {accounts.map(acc => {
                        const Icon = getAccountIcon(acc.type);
                        return (
                            <div
                                key={acc._id}
                                className="glass p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-slate-50 p-2.5 rounded-xl">
                                        <Icon className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                                        {acc.type}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="mt-4 space-y-3">
                                    <p className="text-slate-500 text-xs font-semibold truncate">
                                        {acc.name}
                                    </p>
                                    <h3 className="text-2xl font-black text-slate-900">
                                        ₹{acc.balance.toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {accounts.length === 0 && (
                        <div className="col-span-full py-12 glass rounded-2xl border-2 border-dashed border-slate-200">
                            <button
                                onClick={() => setIsAccountModalOpen(true)}
                                className="w-full flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <div className="bg-slate-50 p-4 rounded-full">
                                    <Plus className="w-8 h-8" />
                                </div>
                                <p className="font-bold text-sm">Create Your Account    </p>
                            </button>
                        </div>
                    )}
                </div>
            </section>
            {accounts.length > 0 && (
                <div className="space-y-10">
                    <SummaryCards summary={summary} />
                    <Charts summary={summary} catSummary={catSummary} />
                    <TransactionList
                        transactions={transactions}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            )}

            <button
                onClick={() => {
                    if (accounts.length === 0) {
                        setIsAccountModalOpen(true);
                        toast.error("Please create an account first");
                    } else {
                        setEditData(null);
                        setIsModalOpen(true);
                    }
                }}
                className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-40"
            >
                <Plus className="w-8 h-8" />
            </button>

            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddOrEdit}
                editData={editData}
            />

            <AccountModal
                isOpen={isAccountModalOpen}
                onClose={() => setIsAccountModalOpen(false)}
                onSubmit={handleAddAccount}
            />
        </div>
    );
};

export default Dashboard;
