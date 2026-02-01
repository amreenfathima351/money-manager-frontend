import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const SummaryCards = ({ summary }) => {
    const cards = [
        {
            title: 'Total Income',
            amount: summary.income || 0,
            icon: TrendingUp,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
        {
            title: 'Total Expenses',
            amount: summary.expense || 0,
            icon: TrendingDown,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
        },
        {
            title: 'Balance',
            amount: summary.balance || 0,
            icon: Wallet,
            color: 'text-primary-600',
            bg: 'bg-primary-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <div key={index} className="glass p-6 rounded-2xl flex items-center space-x-4">
                    <div className={`${card.bg} p-3 rounded-xl`}>
                        <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">{card.title}</p>
                        <h3 className={`text-2xl font-bold ${card.color}`}>
                            ₹{card.amount.toLocaleString()}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
