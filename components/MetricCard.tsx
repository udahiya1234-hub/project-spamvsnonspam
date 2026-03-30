import React from 'react';

interface MetricCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
    return (
        <div className="relative group p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="glass-panel relative h-full p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)] transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-white to-slate-50 shadow-sm p-3 rounded-xl border border-slate-200/60 group-hover:border-neon-blue/30 transition-colors relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {React.isValidElement(icon)
                            ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-slate-600 group-hover:text-neon-blue transition-colors relative z-10" })
                            : icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-slate-100/50 px-2.5 py-1 rounded-full border border-slate-200/50 group-hover:text-neon-blue group-hover:bg-neon-blue/5 group-hover:border-neon-blue/20 transition-all duration-300">
                        Model Stats
                    </span>
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium tracking-wide mb-1 group-hover:text-slate-700 transition-colors">{title}</p>
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 group-hover:from-neon-blue group-hover:to-neon-purple transition-all duration-500">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;