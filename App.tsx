import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { Message, Author, GroundingSource } from './types';
import { getChatResponseStream, getDeepDiveResponseStream } from './services/geminiService';
import { LoginPage } from './components/LoginPage';
import { SettingsPage } from './components/SettingsPage';

const GREETING_MESSAGE: Message = {
    id: `greeting-${Date.now()}`,
    author: Author.AI,
    content: "Hello, I'm the Health Inclusion Coach. Think of me as a safe and confidential partner to help you explore topics around equality, diversity, and inclusion. Everything we discuss here is private. How can I support your reflection and learning today?",
    feedback: null,
};

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
    const [isLoading, setIsLoading] = useState(false);
    const [isThinkingMode, setIsThinkingMode] = useState(false);
    const [loadingState, setLoadingState] = useState<{ mode: 'chat' | 'deepDive' | null; fileName?: string }>({ mode: null });

    const [page, setPage] = useState<'login' | 'chat' | 'settings'>('login');
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        // Check for logged-in user on initial load
        const loggedInUser = localStorage.getItem('nhs-inclusion-coach-user');
        if (loggedInUser) {
            setUser(loggedInUser);
            setPage('chat');
        } else {
            setPage('login');
        }

        // Load chat history
        const savedHistory = localStorage.getItem('nhs-inclusion-coach-history');
        if (savedHistory) {
            const parsedHistory = JSON.parse(savedHistory).map((msg: Message, index: number) => ({
                ...msg,
                id: msg.id || `${msg.author}-${Date.now()}-${index}`, // Add ID if missing
                feedback: msg.feedback !== undefined ? msg.feedback : null, // Ensure feedback exists
            }));
            setMessages(parsedHistory);
        }
    }, []);

    // Save chat history whenever it changes
    useEffect(() => {
        if (page === 'chat' && messages.length > 1) {
            localStorage.setItem('nhs-inclusion-coach-history', JSON.stringify(messages));
        }
    }, [messages, page]);


    const handleLogin = (username: string) => {
        setUser(username);
        localStorage.setItem('nhs-inclusion-coach-user', username);
        setPage('chat');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('nhs-inclusion-coach-user');
        localStorage.removeItem('nhs-inclusion-coach-history');
        setMessages([GREETING_MESSAGE]);
        setPage('login');
    };

    const handleClearHistory = () => {
        setMessages([GREETING_MESSAGE]);
        localStorage.removeItem('nhs-inclusion-coach-history');
        alert('Chat history has been cleared.');
        setPage('chat');
    };

    const handleFeedback = (messageId: string, feedback: 'up' | 'down' | null) => {
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === messageId ? { ...msg, feedback } : msg
            )
        );
        // In a real app, you might send this feedback to a logging service.
        console.log(`Feedback for message ${messageId}: ${feedback}`);
    };

    const handleSendMessage = async (newMessage: string, file?: File) => {
        const messageText = newMessage || (file ? `Analyze the document: ${file.name}` : '');
        if (!messageText) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            author: Author.USER,
            content: messageText
        };
        const historyForAPI = [...messages];
        const aiPlaceholder: Message = {
            id: `ai-${Date.now()}`,
            author: Author.AI,
            content: "",
            sources: [],
            feedback: null,
        };

        setMessages(prev => [...prev, userMessage, aiPlaceholder]);
        setIsLoading(true);

        const isDeepDive = isThinkingMode || file;
        setLoadingState({
            mode: isDeepDive ? 'deepDive' : 'chat',
            fileName: file?.name
        });

        try {
            const stream = isDeepDive
                ? getDeepDiveResponseStream(messageText, file)
                : getChatResponseStream(historyForAPI, messageText);

            let accumulatedText = "";
            let accumulatedSources: GroundingSource[] = [];

            for await (const chunk of stream) {
                accumulatedText += chunk.text;
                if (chunk.sources && chunk.sources.length > 0) {
                    accumulatedSources.push(...chunk.sources);
                }

                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    if (lastMessage && lastMessage.author === Author.AI) {
                        lastMessage.content = accumulatedText;
                        lastMessage.sources = Array.from(new Map(accumulatedSources.map(s => [s.uri, s])).values());
                    }
                    return updatedMessages;
                });
            }

        } catch (error) {
            console.error("Failed to get response:", error);
            const errorMessageContent = "I'm sorry, I'm having trouble connecting right now. Please try again later.";
            setMessages(prev => {
                const updatedMessages = [...prev];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                if (lastMessage && lastMessage.author === Author.AI) {
                    lastMessage.content = errorMessageContent;
                } else {
                    // This case is unlikely but handles if the user message failed to add.
                    updatedMessages.push({
                        id: `error-${Date.now()}`,
                        author: Author.AI,
                        content: errorMessageContent,
                        feedback: null
                    });
                }
                return updatedMessages;
            });
        } finally {
            setIsLoading(false);
            setLoadingState({ mode: null });
        }
    };

    const renderPage = () => {
        switch (page) {
            case 'login':
                return <LoginPage onLogin={handleLogin} />;
            case 'settings':
                return <SettingsPage
                    onBack={() => setPage('chat')}
                    onLogout={handleLogout}
                    onClearHistory={handleClearHistory}
                />;
            case 'chat':
            default:
                return (
                    <div className="h-full w-full flex flex-col font-sans bg-slate-50">
                        <Header
                            isThinkingMode={isThinkingMode}
                            setIsThinkingMode={setIsThinkingMode}
                            onSettingsClick={() => setPage('settings')}
                        />
                        <main className="flex-1 container mx-auto flex flex-col max-w-4xl w-full overflow-hidden">
                            <ChatWindow
                                messages={messages}
                                isLoading={isLoading}
                                loadingState={loadingState}
                                onSendMessage={handleSendMessage}
                                onFeedback={handleFeedback}
                                setIsThinkingMode={setIsThinkingMode}
                                showStarters={messages.length <= 1}
                            />
                        </main>
                    </div>
                );
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center font-sans bg-slate-50">
            {renderPage()}
        </div>
    );
};

export default App;
