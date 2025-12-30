import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';
import { PaperclipIcon, SendIcon, CloseIcon } from './icons';

interface ChatWindowProps {
    messages: MessageType[];
    isLoading: boolean;
    loadingState: { mode: 'chat' | 'deepDive' | null; fileName?: string };
    onSendMessage: (message: string, file?: File) => void;
    onFeedback: (messageId: string, feedback: 'up' | 'down' | null) => void;
    setIsThinkingMode: (isThinking: boolean) => void;
    showStarters: boolean;
}

interface ConversationStartersProps {
    onSelect: (starter: string) => void;
}

const ConversationStarters: React.FC<ConversationStartersProps> = ({ onSelect }) => {
    const starters = [
        'What are microaggressions?',
        'How can I create an inclusive team culture?',
        'What does it mean to be an ally?',
        'Help me understand unconscious bias.',
    ];

    return (
        <div className="my-6 px-4">
            <p className="text-sm font-medium text-slate-600 mb-3">Or try one of these conversation starters:</p>
            <div className="flex flex-wrap gap-2">
                {starters.map((starter, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(starter)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-full text-sm text-[#005EB8] font-medium hover:bg-slate-100 hover:border-[#005EB8] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EB8]"
                    >
                        {starter}
                    </button>
                ))}
            </div>
        </div>
    );
};


export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, loadingState, onSendMessage, onFeedback, setIsThinkingMode, showStarters }) => {
    const [inputValue, setInputValue] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAttachedFile(e.target.files[0]);
            setIsThinkingMode(true);
        }
    };

    const handleRemoveFile = () => {
        setAttachedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
    
    const sendMessageAndClear = (message: string, file: File | null) => {
        if (!message && !file) return;
        onSendMessage(message, file || undefined);
        setInputValue('');
        setAttachedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessageAndClear(inputValue.trim(), attachedFile);
    };
    
    const handleSummarizeClick = () => {
        sendMessageAndClear("Please provide a concise summary of the attached document.", attachedFile);
    };

    const handleSelectStarter = (starter: string) => {
        setInputValue(starter);
        textInputRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-t-lg shadow-lg">
            <div className="flex-1 p-6 overflow-y-auto">
                {messages.map((msg, index) => (
                    <Message 
                        key={msg.id || index} 
                        message={msg} 
                        isLoading={isLoading && index === messages.length - 1}
                        loadingState={loadingState}
                        onFeedback={onFeedback}
                    />
                ))}
                {showStarters && <ConversationStarters onSelect={handleSelectStarter} />}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-slate-50">
                <div className="w-full">
                     {attachedFile && (
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm inline-flex items-center min-w-0">
                                <span className="truncate" title={attachedFile.name}>{attachedFile.name}</span>
                                <button onClick={handleRemoveFile} className="ml-2 p-1 rounded-full hover:bg-blue-200 flex-shrink-0">
                                    <CloseIcon />
                                </button>
                            </div>
                            <button
                                onClick={handleSummarizeClick}
                                className="flex-shrink-0 flex items-center px-4 py-2 bg-white border border-slate-300 rounded-full text-sm text-[#005EB8] font-medium hover:bg-slate-100 hover:border-[#005EB8] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EB8]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                Summarize
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex items-center p-2 bg-white rounded-full shadow-lg border border-slate-200/50">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-500 hover:text-[#005EB8] transition-colors rounded-full"
                            aria-label="Attach file"
                            disabled={isLoading}
                        >
                            <PaperclipIcon />
                        </button>
                        <input
                            ref={textInputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={attachedFile ? `Ask a question about ${attachedFile.name}` : "Ask the Inclusion Coach..."}
                            className="flex-1 w-full px-2 py-2 bg-transparent border-none focus:outline-none placeholder-slate-500"
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="p-3 bg-[#005EB8] text-white rounded-full hover:bg-[#004C97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EB8] disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md disabled:shadow-none"
                            disabled={isLoading || (!inputValue.trim() && !attachedFile)}
                             aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
