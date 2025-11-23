import React, { useState } from 'react';
import { Target, BarChart3, ShieldAlert, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import MetricCard from './MetricCard';
import ComparisonChart from './ComparisonChart';
import InfoCard from './InfoCard';
import Tabs from './Tabs';
import TourGuide from './TourGuide';
import { modelData, bestModel } from '../constants';

const Dashboard: React.FC = () => {
    const [isTourOpen, setIsTourOpen] = useState(false);

    const tourSteps = [
        {
            targetId: 'tour-header',
            title: 'Welcome to the Hub',
            description: 'This dashboard visualizes the results of our comprehensive machine learning analysis on Spam Detection. We tested 6 different algorithms to find the best one.',
        },
        {
            targetId: 'tour-champion',
            title: 'The Champion Model',
            description: 'Here is our winner. The Initial SVM (Support Vector Machine) achieved a remarkable 98.2% accuracy, outperforming all other models in our tests.',
        },
        {
            targetId: 'tour-metrics',
            title: 'Key Performance Metrics',
            description: 'We track four critical stats. Precision (how many flagged items were actually spam) and Recall (how much actual spam we caught) are the most important for this use case.',
        },
        {
            targetId: 'tour-chart',
            title: 'Comparative Analysis',
            description: 'This chart compares all models side-by-side. You can click on the legend items at the bottom to toggle specific metrics on and off for a clearer view.',
        },
        {
            targetId: 'tour-tabs',
            title: 'Deep Dive',
            description: 'Use these tabs to switch between this Overview and the "Analysis & Insights" section, where we visualize the vector separation and explain our testing methodology.',
        }
    ];

    const tabs = [
        {
            label: 'Overview',
            content: (
                <div className="space-y-8">
                    <section id="tour-champion">
                        <div className="flex items-center space-x-3 mb-6">
                             <div className="bg-white/60 p-2 rounded-lg border border-neon-purple/30 shadow-sm">
                                <Zap className="w-5 h-5 text-neon-purple" />
                             </div>
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                Champion Model: <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Initial SVM</span>
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="tour-metrics">
                            <MetricCard 
                                title="Overall Accuracy" 
                                value={`${(bestModel.accuracy * 100).toFixed(1)}%`} 
                                icon={<Target />} 
                            />
                            <MetricCard 
                                title="Spam Precision" 
                                value={`${(bestModel.precision * 100).toFixed(1)}%`} 
                                icon={<ShieldCheck />} 
                            />
                            <MetricCard 
                                title="Spam Recall" 
                                value={`${(bestModel.recall * 100).toFixed(1)}%`} 
                                icon={<ShieldAlert />} 
                            />
                            <MetricCard 
                                title="Spam F1-Score" 
                                value={`${(bestModel.f1Score * 100).toFixed(1)}%`} 
                                icon={<BarChart3 />} 
                            />
                        </div>
                    </section>

                    <section className="glass-panel p-1 rounded-3xl" id="tour-chart">
                         <div className="bg-white/50 rounded-[20px] p-6 sm:p-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-800">Model Comparison Analysis</h3>
                                <p className="text-sm text-slate-500">Performance metrics across all evaluated algorithms</p>
                            </div>
                            <ComparisonChart data={modelData} />
                        </div>
                    </section>
                </div>
            ),
        },
        {
            label: 'Analysis & Insights',
            content: (
                 <div className="space-y-8">
                     {/* Row 1: Key Findings + Visualization */}
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                         <div className="lg:col-span-2 h-full">
                            <InfoCard title="Key Findings">
                                <ul className="space-y-4 list-none text-slate-600">
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(14,165,233,0.6)]"></span>
                                        <span><strong className="text-slate-800">SVM Dominance:</strong> Both Initial and Tuned SVM models achieved the highest accuracy (~98.2%) and robust spam detection metrics, making them the top contenders.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-neon-green shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                                        <span><strong className="text-slate-800">Precision vs Recall:</strong> Random Forest offered excellent precision (99%) but lagged in recall (81%), meaning it missed some spam messages compared to SVM.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-neon-pink shadow-[0_0_8px_rgba(236,72,153,0.6)]"></span>
                                        <span><strong className="text-slate-800">Weakest Links:</strong> Naive Bayes and Logistic Regression struggled specifically with identifying spam (low recall), despite being generally accurate on safe messages.</span>
                                    </li>
                                </ul>
                            </InfoCard>
                         </div>
                         {/* Image Card 1 */}
                         <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden glass-panel border-0 group min-h-[250px] shadow-lg">
                            <img 
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                                alt="Data Analysis" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="px-2 py-1 text-xs font-bold text-white bg-neon-blue/80 backdrop-blur-md rounded uppercase tracking-wider mb-2 inline-block">Visualization</span>
                                <h4 className="text-white font-bold text-lg">Performance Distribution</h4>
                                <p className="text-sm text-gray-200 mt-1">High-dimensional separation of spam vectors.</p>
                            </div>
                         </div>
                     </div>

                     {/* Row 2: Strategy + System Image */}
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                         {/* Image Card 2 */}
                         <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden glass-panel border-0 group order-2 lg:order-1 min-h-[250px] shadow-lg">
                            <img 
                                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000" 
                                alt="System Architecture" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-6">
                                <span className="px-2 py-1 text-xs font-bold text-white bg-neon-pink/80 backdrop-blur-md rounded uppercase tracking-wider mb-2 inline-block">Architecture</span>
                                <h4 className="text-white font-bold text-lg">Data Integrity</h4>
                                <p className="text-sm text-gray-200 mt-1">Strict isolation of test datasets.</p>
                            </div>
                         </div>
                         
                         <div className="lg:col-span-2 flex flex-col gap-6 order-1 lg:order-2">
                            <InfoCard title="Leakage Prevention Strategy">
                                <p className="text-slate-600 mb-4">To ensure the integrity of our results, we implemented strict isolation protocols:</p>
                                <ul className="space-y-3">
                                    <li className="bg-white/60 p-3 rounded-lg border border-slate-200 hover:bg-white/80 transition-colors shadow-sm">
                                        <strong className="text-neon-blue block mb-1">Strict Data Splitting</strong>
                                        <span className="text-sm text-slate-600">Dataset was split into training/test sets before any processing occurred.</span>
                                    </li>
                                    <li className="bg-white/60 p-3 rounded-lg border border-slate-200 hover:bg-white/80 transition-colors shadow-sm">
                                        <strong className="text-neon-purple block mb-1">Isolated Vectorization</strong>
                                        <span className="text-sm text-slate-600">The <code className="text-neon-pink bg-slate-100 border border-slate-200 px-1 py-0.5 rounded font-semibold">TfidfVectorizer</code> was fit <em>only</em> on training data. Vocabulary from the test set was completely ignored during training.</span>
                                    </li>
                                </ul>
                            </InfoCard>
                            <div className="glass-panel p-6 rounded-2xl border-l-4 border-neon-pink flex items-center gap-4">
                                <div className="hidden sm:flex shrink-0 bg-neon-pink/10 p-3 rounded-full">
                                    <ShieldAlert className="w-6 h-6 text-neon-pink" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-800 mb-1">Why this matters?</h4>
                                    <p className="text-sm text-slate-600">
                                        Fitting vectorizers on the whole dataset gives models "future knowledge" of words they shouldn't see yet. Our method ensures the 98.2% accuracy is <strong>real</strong> and reproducible in production.
                                    </p>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
            ),
        },
    ];

    return (
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
            <TourGuide 
                steps={tourSteps} 
                isOpen={isTourOpen} 
                onClose={() => setIsTourOpen(false)} 
            />

            <header className="mb-12 text-center sm:text-left relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6" id="tour-header">
                <div>
                    <div className="absolute top-0 right-0 hidden sm:block opacity-40 pointer-events-none">
                        <div className="w-64 h-64 bg-neon-blue/30 rounded-full blur-[100px] mix-blend-multiply"></div>
                    </div>
                    
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-neon-blue/30 bg-white/60 backdrop-blur text-neon-blue text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-neon-blue mr-2 animate-pulse"></span>
                        Live Analysis Dashboard
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-4">
                        Spam Detection <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                            Performance Hub
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
                        Deep dive into the efficacy of Machine Learning models in classifying unsolicited messages. Powered by Google Colab analysis.
                    </p>
                </div>
                
                <button 
                    onClick={() => setIsTourOpen(true)}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-neon-purple/50 text-slate-700 font-semibold rounded-full shadow-sm hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
                >
                    <div className="bg-neon-purple/10 p-1.5 rounded-full group-hover:bg-neon-purple group-hover:text-white transition-colors">
                        <HelpCircle size={18} />
                    </div>
                    <span>Start Guided Tour</span>
                </button>
            </header>
            
            <Tabs tabs={tabs} />
        </main>
    );
};

export default Dashboard;