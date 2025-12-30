import React from 'react';

interface SettingsPageProps {
    onBack: () => void;
    onLogout: () => void;
    onClearHistory: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, onLogout, onClearHistory }) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
             <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
                 <button 
                    onClick={onBack} 
                    className="text-sm font-medium text-[#005EB8] hover:underline"
                >
                   &larr; Back to Chat
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Manage Data</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Your chat history is stored only in your browser. Clearing it cannot be undone.
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={onClearHistory}
                            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            Clear Chat History
                        </button>
                    </div>
                </div>
                <div className="p-6">
                     <h2 className="text-lg font-medium text-gray-900">Account</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Logging out will clear your name and chat history from this browser.
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
