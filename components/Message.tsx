import React from 'react';
import { Message as MessageType, Author } from '../types';
import { BotIcon, UserIcon, ThumbsUpIcon, ThumbsDownIcon } from './icons';

const ThinkingIndicator = () => (
    <div className="flex items-start my-4 justify-start">
        <div className="mr-3 text-slate-500">
            <BotIcon />
        </div>
        <div className="px-4 py-3 bg-[#005EB8] text-white rounded-r-xl rounded-bl-xl flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
    </div>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const DeepDiveIndicator = ({ fileName }: { fileName?: string }) => (
    <div className="flex items-start my-4 justify-start">
        <div className="mr-3 text-slate-500">
            <BotIcon />
        </div>
        <div className="px-4 py-3 bg-[#005EB8] text-white rounded-r-xl rounded-bl-xl">
            <div className="flex items-center space-x-3">
                <SpinnerIcon />
                <span className="font-semibold">Performing Deep Dive Analysis...</span>
            </div>
            <p className="text-sm text-blue-100 mt-1 max-w-xs truncate">
                {fileName 
                    ? `Reviewing "${fileName}"...` 
                    : "This may take a moment while I review the details."}
            </p>
        </div>
    </div>
);


interface MessageProps {
    message: MessageType;
    isLoading?: boolean;
    loadingState?: { mode: 'chat' | 'deepDive' | null; fileName?: string };
    onFeedback?: (messageId: string, feedback: 'up' | 'down' | null) => void;
}

export const Message: React.FC<MessageProps> = ({ message, isLoading, loadingState, onFeedback }) => {
    const isAI = message.author === Author.AI;

    if (isAI && isLoading && !message.content) {
        if (loadingState?.mode === 'deepDive') {
            return <DeepDiveIndicator fileName={loadingState.fileName} />;
        }
        return <ThinkingIndicator />;
    }

    const wrapperClasses = isAI ? 'justify-start' : 'justify-end';
    const bubbleClasses = isAI 
        ? 'bg-[#005EB8] text-white rounded-r-xl rounded-bl-xl' 
        : 'bg-slate-200 text-gray-800 rounded-l-xl rounded-br-xl';
    const avatarClasses = isAI ? 'mr-3 text-slate-500' : 'ml-3 order-2 text-slate-500';

    const renderContent = (content: string) => {
        const streamingCursor = isAI && isLoading ? '<span class="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>' : '';
        const contentWithCursor = content + streamingCursor;

        const lines = contentWithCursor.split('\n');
        return lines.map((line, index) => {
            // Basic markdown for bold
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // Inline citations for AI messages with sources
            if (isAI && message.sources && message.sources.length > 0) {
                line = line.replace(/\[(\d+)\]/g, (match, number) => {
                    const sourceIndex = parseInt(number, 10) - 1;
                    if (sourceIndex >= 0 && sourceIndex < (message.sources?.length ?? 0)) {
                        return `<sup><a href="#source-${sourceIndex}" class="inline-block align-baseline text-xs font-bold text-blue-200 no-underline hover:text-white hover:scale-110 transition-transform px-1">[$1]</a></sup>`;
                    }
                    return match; // Return original if no corresponding source
                });
            }

            // Markdown for lists
            if (line.trim().startsWith('* ')) {
                return <li key={index} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
            }
             if (line.trim().startsWith('- ')) {
                return <li key={index} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
            }
            return <p key={index} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: line }} />;
        });
    };

    const handleFeedback = (feedback: 'up' | 'down') => {
        if (onFeedback) {
            const newFeedback = message.feedback === feedback ? null : feedback;
            onFeedback(message.id, newFeedback as 'up' | 'down' | null);
        }
    };
    
    return (
        <div className={`flex items-start my-4 ${wrapperClasses}`}>
            <div className={avatarClasses}>
                {isAI ? <BotIcon /> : <UserIcon />}
            </div>
            <div className="flex flex-col max-w-lg">
                <div className={`px-4 py-3 ${bubbleClasses}`}>
                    {renderContent(message.content)}
                </div>

                {isAI && !isLoading && message.content && (
                    <div className="flex items-center space-x-2 mt-2 pl-1">
                        <button 
                            onClick={() => handleFeedback('up')}
                            className={`p-1 rounded-full transition-colors ${message.feedback === 'up' ? 'bg-blue-100 text-[#005EB8]' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                            aria-label="Helpful"
                            title="Helpful"
                        >
                            <ThumbsUpIcon />
                        </button>
                        <button 
                            onClick={() => handleFeedback('down')}
                            className={`p-1 rounded-full transition-colors ${message.feedback === 'down' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                            aria-label="Not helpful"
                            title="Not helpful"
                        >
                            <ThumbsDownIcon />
                        </button>
                    </div>
                )}

                {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 px-1 text-xs text-gray-500">
                        <h4 className="font-semibold mb-1">Sources:</h4>
                        <ul className="space-y-1">
                            {message.sources.map((source, index) => (
                                <li key={index} id={`source-${index}`} className="truncate scroll-mt-20">
                                    <a 
                                        href={source.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 hover:underline"
                                        title={source.title}
                                    >
                                        {`[${index + 1}] ${source.title}`}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
