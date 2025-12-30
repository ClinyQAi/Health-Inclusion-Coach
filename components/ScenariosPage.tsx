import React from 'react';
import { Author, Message } from '../types';

interface Scenario {
    id: string;
    title: string;
    description: string;
    audience: 'student' | 'staff';
    initialPrompt: string;
}

const SCENARIOS: Scenario[] = [
    {
        id: 'handover',
        title: 'Handover Microaggression',
        description: 'You are a nursing student. During a handover, a senior colleague makes a biased comment about a patient\'s background. Practice how to reflect on this and respond.',
        audience: 'student',
        initialPrompt: "Let's start the 'Handover Microaggression' simulation. You are a nursing student in the handover room. A senior nurse says: 'We always have trouble with families from that part of town, they never follow the care plan anyway.' How does that comment make you feel, and what is your first thought about how to respond?"
    },
    {
        id: 'recruitment',
        title: 'Bias in Recruitment',
        description: 'You are a ward manager on an interview panel. A fellow panelist suggests a candidate "might not fit in" due to cultural differences. Practice challenging this bias.',
        audience: 'staff',
        initialPrompt: "Let's start the 'Bias in Recruitment' simulation. You are a ward manager on an interview panel. After a strong interview from a candidate with a diverse background, your colleague leans over and whispers: 'They were good, but I'm not sure they'd fit the culture of our team. You know what I mean.' How would you like to open a conversation about that 'fit' comment?"
    }
];

interface ScenariosPageProps {
    onStartScenario: (initialMessage: string) => void;
    onBack: () => void;
}

export const ScenariosPage: React.FC<ScenariosPageProps> = ({ onStartScenario, onBack }) => {
    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            <header className="p-4 bg-white border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Guided Scenarios (Beta)</h2>
                <button
                    onClick={onBack}
                    className="text-sm text-[#005EB8] font-medium hover:underline"
                >
                    Back to Chat
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <section>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Student Scenarios</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {SCENARIOS.filter(s => s.audience === 'student').map(scenario => (
                            <div key={scenario.id} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-[#005EB8] transition-all group">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">{scenario.title}</h4>
                                <p className="text-sm text-slate-600 mb-4">{scenario.description}</p>
                                <button
                                    onClick={() => onStartScenario(scenario.initialPrompt)}
                                    className="w-full py-2 bg-slate-50 text-[#005EB8] rounded-lg font-medium group-hover:bg-[#005EB8] group-hover:text-white transition-colors"
                                >
                                    Start Simulation
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Staff Scenarios</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {SCENARIOS.filter(s => s.audience === 'staff').map(scenario => (
                            <div key={scenario.id} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-[#005EB8] transition-all group">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">{scenario.title}</h4>
                                <p className="text-sm text-slate-600 mb-4">{scenario.description}</p>
                                <button
                                    onClick={() => onStartScenario(scenario.initialPrompt)}
                                    className="w-full py-2 bg-slate-50 text-[#005EB8] rounded-lg font-medium group-hover:bg-[#005EB8] group-hover:text-white transition-colors"
                                >
                                    Start Simulation
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 italic">
                        "Simulations provide a safe 'sandpit' to practice challenging conversations before they happen in real clinical settings."
                    </p>
                </div>
            </div>
        </div>
    );
};
