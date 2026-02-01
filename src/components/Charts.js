import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0ea5e9', '#f43f5e', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6', '#ec4899'];

const Charts = ({ summary, catSummary }) => {
    const totalsData = [
        {
            name: 'Financial Overview',
            income: summary.income || 0,
            expense: summary.expense || 0,
        }
    ];

    const pieData = (catSummary || []).map(item => ({
        name: item._id,
        value: item.totalAmount
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="glass p-6 rounded-2xl h-80">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Income vs Expense</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={totalsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(8px)'
                            }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                        <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="glass p-6 rounded-2xl h-80">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Expense by Category</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;
