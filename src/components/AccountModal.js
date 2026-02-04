import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AccountModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'bank',
        balance: '',
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name,
                type: editData.type,
                balance: editData.balance,
            });
        } else {
            setFormData({
                name: '',
                type: 'bank',
                balance: '',
            });
        }
    }, [editData, isOpen]);

    const accountTypes = [
        { id: 'bank', label: 'Bank' },
        { id: 'cash', label: 'Cash' },
        { id: 'credit', label: 'Credit Card' },
        { id: 'savings', label: 'Savings' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">
                        {editData ? 'Edit Account' : 'Add New Account'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter Account Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Initial Balance (₹)</label>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="Enter Initial Balance"
                            value={formData.balance}
                            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
                        <select
                            className="input-field text-black"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            required
                        >
                            {accountTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full btn-primary h-12 mt-6">
                        {editData ? 'Update Account' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountModal;
