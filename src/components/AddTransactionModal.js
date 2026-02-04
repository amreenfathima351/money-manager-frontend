import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { accountService } from '../services/api';
import toast from 'react-hot-toast';

const AddTransactionModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [activeTab, setActiveTab] = useState('income');
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        division: 'personal',
        description: '',
        fromAccount: '',
        toAccount: '',
    });

    useEffect(() => {
        if (isOpen) {
            fetchAccounts();
        }
    }, [isOpen]);

    useEffect(() => {
        if (editData) {
            setActiveTab(editData.type);
            setFormData({
                amount: editData.amount,
                category: editData.category || '',
                division: editData.division,
                description: editData.description,
                fromAccount: editData.fromAccount?._id || editData.fromAccount || '',
                toAccount: editData.toAccount?._id || editData.toAccount || '',
            });
        } else {
            setFormData({
                amount: '',
                category: '',
                division: 'personal',
                description: '',
                fromAccount: accounts[0]?._id || '',
                toAccount: '',
            });
        }
    }, [editData, isOpen, accounts]);

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const res = await accountService.getAll();
            setAccounts(res.data);
            if (!editData && res.data.length > 0 && !formData.fromAccount) {
                setFormData(prev => ({ ...prev, fromAccount: res.data[0]._id }));
            }
        } catch (error) {
            toast.error('Failed to load accounts');
        } finally {
            setLoading(false);
        }
    };

    const categories = {
        income: ['salary', 'business', 'gift', 'other'],
        expense: ['food', 'fuel', 'medical', 'movie', 'loan', 'shopping', 'other'],
        transfer: []
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (activeTab === 'transfer' && formData.fromAccount === formData.toAccount) {
            return toast.error('Source and destination accounts must be different');
        }

        onSubmit({ ...formData, type: activeTab });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">
                        {editData ? 'Edit Record' : 'Add New Record'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-1 mx-6 mt-6 bg-slate-100 rounded-xl flex gap-1">
                    {[
                        { id: 'income', label: 'Income', color: 'text-emerald-600' },
                        { id: 'expense', label: 'Expense', color: 'text-rose-600' },
                        { id: 'transfer', label: 'Transfer', color: 'text-blue-600' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === tab.id ? `bg-white ${tab.color} shadow-sm` : 'text-slate-500'
                                }`}
                            onClick={() => {
                                setActiveTab(tab.id);
                                if (tab.id === 'transfer') {
                                    setFormData(prev => ({ ...prev, category: 'Transfer' }));
                                }
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>

                    {activeTab !== 'transfer' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                className="input-field text-black"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories[activeTab].map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className={activeTab === 'transfer' ? '' : 'col-span-2'}>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                {activeTab === 'transfer' ? 'From Account' : 'Account'}
                            </label>
                            <select
                                className="input-field text-black"
                                value={formData.fromAccount}
                                onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
                                required
                            >
                                <option value="">Select Account</option>
                                {accounts.map(acc => (
                                    <option key={acc._id} value={acc._id}>{acc.name} (₹{acc.balance.toLocaleString()})</option>
                                ))}
                            </select>
                        </div>

                        {activeTab === 'transfer' && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">To Account</label>
                                <select
                                    className="input-field text-black"
                                    value={formData.toAccount}
                                    onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                                    required={activeTab === 'transfer'}
                                >
                                    <option value="">Select Account</option>
                                    {accounts.map(acc => (
                                        <option key={acc._id} value={acc._id}>{acc.name} (₹{acc.balance.toLocaleString()})</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Division</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="division"
                                    value="personal"
                                    checked={formData.division === 'personal'}
                                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                    className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm text-slate-600">Personal</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="division"
                                    value="office"
                                    checked={formData.division === 'office'}
                                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                    className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm text-slate-600">Office</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="What was this for?"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            maxLength={100}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || accounts.length === 0}
                        className="w-full btn-primary h-12 mt-6 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : (editData ? 'Update Transaction' : `Add ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`)}
                    </button>

                    {accounts.length === 0 && !loading && (
                        <p className="text-[10px] text-rose-500 text-center font-bold">Please add an account first to log transactions.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
