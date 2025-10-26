import React from 'react';
import { ThinkingModeToggle } from './ThinkingModeToggle';
import { SettingsIcon } from './icons';

interface HeaderProps {
    isThinkingMode: boolean;
    setIsThinkingMode: (isThinking: boolean) => void;
    onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isThinkingMode, setIsThinkingMode, onSettingsClick }) => {
    return (
        <header className="w-full p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-[#005EB8] text-white flex items-center justify-center rounded-full font-bold text-lg">
                        IC
                    </div>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                        NHS Inclusion Coach
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <ThinkingModeToggle isThinkingMode={isThinkingMode} setIsThinkingMode={setIsThinkingMode} />
                     <button
                        onClick={onSettingsClick}
                        className="p-2 text-gray-500 hover:text-[#005EB8] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EB8]"
                        aria-label="Open settings"
                    >
                        <SettingsIcon />
                    </button>
                </div>
            </div>
        </header>
    );
};
