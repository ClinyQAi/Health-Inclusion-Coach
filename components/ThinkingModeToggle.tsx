
import React from 'react';

interface ThinkingModeToggleProps {
    isThinkingMode: boolean;
    setIsThinkingMode: (isThinking: boolean) => void;
}

export const ThinkingModeToggle: React.FC<ThinkingModeToggleProps> = ({ isThinkingMode, setIsThinkingMode }) => {
    const toggleClasses = isThinkingMode ? 'bg-[#005EB8]' : 'bg-gray-300';
    const circleClasses = isThinkingMode ? 'translate-x-5' : 'translate-x-0';

    return (
        <div className="flex items-center space-x-3">
            <div className="text-right">
                <div className="font-semibold text-gray-700">Deep Dive</div>
                <div className="text-xs text-gray-500">For complex analysis</div>
            </div>
            <button
                onClick={() => setIsThinkingMode(!isThinkingMode)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EB8] ${toggleClasses}`}
                aria-pressed={isThinkingMode}
            >
                <span
                    className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${circleClasses}`}
                />
            </button>
        </div>
    );
};
