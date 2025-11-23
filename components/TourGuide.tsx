import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';

interface Step {
    targetId: string;
    title: string;
    description: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TourGuideProps {
    steps: Step[];
    isOpen: boolean;
    onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ steps, isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Audio Speech Logic
    const speak = useCallback((text: string) => {
        if (isMuted || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Try to select a pleasant English voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang.startsWith('en'));
        if (preferredVoice) utterance.voice = preferredVoice;
        
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
    }, [isMuted]);

    // 1. Handle Scrolling to Target (Run ONLY when step changes)
    useEffect(() => {
        if (!isOpen) return;

        const element = document.getElementById(steps[currentStep].targetId);
        if (element) {
            // Smooth scroll to the element
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Speak the description
            // Small delay to let scroll start
            const timer = setTimeout(() => {
                speak(steps[currentStep].description);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [currentStep, isOpen, steps, speak]);

    // 2. Handle Position Tracking (Run on every render/scroll/resize)
    useEffect(() => {
        if (!isOpen) {
            window.speechSynthesis.cancel();
            return;
        }

        const updateRect = () => {
            const element = document.getElementById(steps[currentStep].targetId);
            if (element) {
                setTargetRect(element.getBoundingClientRect());
            }
        };

        // Initial update
        updateRect();

        // Listen for layout changes
        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, { passive: true });

        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect);
        };
    }, [currentStep, isOpen, steps]);

    // Handle closing
    const handleClose = () => {
        window.speechSynthesis.cancel();
        onClose();
        setCurrentStep(0);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (newMuted) {
            window.speechSynthesis.cancel();
        } else {
            speak(steps[currentStep].description);
        }
    };

    if (!isOpen || !targetRect) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
            {/* Spotlight Overlay */}
            <div 
                className="absolute transition-all duration-500 ease-in-out"
                style={{
                    top: targetRect.top,
                    left: targetRect.left,
                    width: targetRect.width,
                    height: targetRect.height,
                    boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.75)', // Dark dimming
                    borderRadius: '12px'
                }}
            />

            {/* Glowing Border around target */}
            <div 
                 className="absolute border-2 border-neon-blue rounded-xl transition-all duration-500 ease-in-out animate-pulse shadow-[0_0_20px_rgba(14,165,233,0.6)]"
                 style={{
                    top: targetRect.top - 4,
                    left: targetRect.left - 4,
                    width: targetRect.width + 8,
                    height: targetRect.height + 8,
                 }}
            />

            {/* Controls Card - Enable pointer events here so buttons work */}
            <div 
                className="absolute z-50 w-full max-w-md p-4 transition-all duration-500 pointer-events-auto"
                style={{
                    // Smart positioning: if near bottom, show above, else show below
                    top: targetRect.bottom + 250 > window.innerHeight 
                        ? Math.max(20, targetRect.top - 240) 
                        : targetRect.bottom + 20,
                    left: Math.max(20, Math.min(targetRect.left, window.innerWidth - 350))
                }}
            >
                <div className="glass-panel bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/50">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                             <span className="bg-neon-blue/10 text-neon-blue text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                Step {currentStep + 1}/{steps.length}
                             </span>
                             {isSpeaking && !isMuted && (
                                 <span className="flex space-x-0.5 h-3 items-end">
                                     <span className="w-1 h-1 bg-neon-purple animate-[bounce_1s_infinite]"></span>
                                     <span className="w-1 h-2 bg-neon-purple animate-[bounce_1s_infinite_0.1s]"></span>
                                     <span className="w-1 h-3 bg-neon-purple animate-[bounce_1s_infinite_0.2s]"></span>
                                 </span>
                             )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={toggleMute} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" title={isMuted ? "Unmute" : "Mute"}>
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <button onClick={handleClose} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors" title="End Tour">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{steps[currentStep].title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                        {steps[currentStep].description}
                    </p>

                    <div className="flex justify-between items-center">
                        <button 
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                            <ChevronLeft size={16} className="mr-1" /> Back
                        </button>
                        <button 
                            onClick={handleNext}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 flex items-center transition-all hover:scale-105"
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'} 
                            {currentStep !== steps.length - 1 && <ChevronRight size={16} className="ml-1" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuide;