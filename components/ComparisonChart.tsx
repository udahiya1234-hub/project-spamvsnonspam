import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ModelPerformance } from '../types';

interface ComparisonChartProps {
    data: ModelPerformance[];
}

const metricDescriptions: Record<string, string> = {
    accuracy: 'Overall percentage of correct predictions (both spam and safe).',
    precision: 'Precision measures reliability: How many flagged "spam" messages were actually spam.',
    recall: 'Recall measures safety: What percentage of actual spam did we manage to catch?',
    f1Score: 'The harmonic mean of Precision and Recall. Best single metric for unbalanced data.',
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        // shared={false} ensures payload usually has 1 item corresponding to the hovered bar
        return (
            <div className="bg-white/95 backdrop-blur-xl p-4 border border-slate-200/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] min-w-[280px] animate-in fade-in zoom-in-95 duration-200 z-50">
                <p className="font-bold text-slate-800 mb-3 text-lg border-b border-slate-100 pb-2">{label}</p>
                {payload.map((pld: any) => (
                    <div key={pld.dataKey}>
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white" style={{ backgroundColor: pld.color }}></span>
                                <span className="text-slate-600 font-semibold text-sm">{pld.name}</span>
                             </div>
                             <span className="text-slate-900 font-mono font-bold text-lg bg-slate-50 px-2 py-0.5 rounded border border-slate-100 shadow-sm">
                                {(pld.value * 100).toFixed(1)}%
                             </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-5 italic mb-3">
                            "{metricDescriptions[pld.dataKey] || 'Performance metric'}"
                        </p>
                    </div>
                ))}
                {/* Show exact raw value at bottom */}
                 <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Raw Value:</span>
                    <span>{payload[0].value.toFixed(5)}</span>
                </div>
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
                    barGap={4}
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
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ fill: 'rgba(14, 165, 233, 0.05)', radius: 4 }}
                        shared={false}
                    />
                    <Legend 
                        onClick={handleLegendClick} 
                        wrapperStyle={{ paddingTop: '20px', cursor: 'pointer', color: '#1e293b' }}
                        iconType="circle"
                    />
                    <Bar 
                        dataKey="accuracy" 
                        name="Accuracy" 
                        fill="#0ea5e9" 
                        radius={[4, 4, 4, 4]} 
                        hide={!visibility.accuracy} 
                        animationDuration={1500} 
                    />
                    <Bar 
                        dataKey="precision" 
                        name="Precision" 
                        fill="#8b5cf6" 
                        radius={[4, 4, 4, 4]} 
                        hide={!visibility.precision} 
                        animationDuration={1500} 
                    />
                    <Bar 
                        dataKey="recall" 
                        name="Recall" 
                        fill="#ec4899" 
                        radius={[4, 4, 4, 4]} 
                        hide={!visibility.recall} 
                        animationDuration={1500} 
                    />
                    <Bar 
                        dataKey="f1Score" 
                        name="F1-Score" 
                        fill="#10b981" 
                        radius={[4, 4, 4, 4]} 
                        hide={!visibility.f1Score} 
                        animationDuration={1500} 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComparisonChart;