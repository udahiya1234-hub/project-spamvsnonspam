import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ModelPerformance } from '../types';

interface ComparisonChartProps {
    data: ModelPerformance[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-xl p-4 border border-slate-200 rounded-xl shadow-xl">
                <p className="font-bold text-slate-800 mb-3 text-lg border-b border-slate-100 pb-2">{`${label}`}</p>
                {payload.map((pld: any) => (
                    <div key={pld.dataKey} className="flex items-center space-x-2 mb-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pld.color }}></span>
                        <span className="text-slate-600 text-sm flex-1">{pld.name}:</span>
                        <span className="text-slate-900 font-mono font-bold text-sm">{pld.value.toFixed(3)}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
    const [visibility, setVisibility] = useState({
        accuracy: true,
        precision: true,
        recall: true,
        f1Score: true,
    });

    const handleLegendClick = (e: any) => {
        const { dataKey } = e;
        if (typeof dataKey === 'string') {
             setVisibility(prev => ({
                ...prev,
                [dataKey as keyof typeof visibility]: !prev[dataKey as keyof typeof visibility]
            }));
        }
    };

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: -20,
                        bottom: 5,
                    }}
                    barGap={2}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} 
                        axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis 
                        domain={[0.7, 1]} 
                        tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} 
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.03)', radius: 4 }}/>
                    <Legend 
                        onClick={handleLegendClick} 
                        wrapperStyle={{ paddingTop: '20px', cursor: 'pointer', color: '#1e293b' }}
                        iconType="circle"
                    />
                    <Bar dataKey="accuracy" fill="#0ea5e9" radius={[4, 4, 0, 0]} hide={!visibility.accuracy} animationDuration={1500} />
                    <Bar dataKey="precision" fill="#8b5cf6" radius={[4, 4, 0, 0]} hide={!visibility.precision} animationDuration={1500} />
                    <Bar dataKey="recall" fill="#ec4899" radius={[4, 4, 0, 0]} hide={!visibility.recall} animationDuration={1500} />
                    <Bar dataKey="f1Score" name="F1-Score" fill="#10b981" radius={[4, 4, 0, 0]} hide={!visibility.f1Score} animationDuration={1500} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComparisonChart;