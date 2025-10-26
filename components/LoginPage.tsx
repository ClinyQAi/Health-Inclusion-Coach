import React, { useState } from 'react';
import { BotIcon } from './icons';

interface LoginPageProps {
    onLogin: (username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name.trim());
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8">
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#005EB8] text-white flex items-center justify-center rounded-full font-bold text-2xl mb-4">
                    IC
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome to the NHS Inclusion Coach</h1>
                <p className="mt-2 text-slate-600">A safe and confidential space for reflection and learning.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Please enter your first name to begin
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="given-name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#005EB8] focus:border-[#005EB8] sm:text-sm"
                            placeholder="e.g., Alex"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005EB8] hover:bg-[#004C97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EB8] disabled:bg-slate-400"
                        disabled={!name.trim()}
                    >
                        Start Conversation
                    </button>
                </div>
            </form>
             <p className="mt-6 text-xs text-center text-gray-500">
                Your conversations are not stored on a server. Clearing your browser data will remove your chat history.
            </p>
        </div>
    );
};
