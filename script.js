document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Function to scroll to the bottom of the chat messages
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Function to add a message to the chat window
    const addMessage = (text, className) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    };

    // Function to show the "thinking" indicator
    const showThinkingIndicator = () => {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.classList.add('thinking-indicator');
        indicatorDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        chatMessages.appendChild(indicatorDiv);
        scrollToBottom();
    };

    // Function to remove the "thinking" indicator
    const removeThinkingIndicator = () => {
        const indicator = document.querySelector('.thinking-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessageText = userInput.value.trim();

        if (!userMessageText) {
            return;
        }

        // 1. Display user's message
        addMessage(userMessageText, 'user-message');
        userInput.value = '';
        userInput.focus();

        // 2. Show thinking indicator
        showThinkingIndicator();

        // 3. Simulate API call and get AI response
        setTimeout(() => {
            // 4. Remove thinking indicator
            removeThinkingIndicator();

            // 5. Display AI message
            const aiResponse = "This is a simulated response from the NHS Inclusion Coach. How can I help you reflect on inclusion and anti-racism today?";
            addMessage(aiResponse, 'ai-message');
        }, 1500);
    });
    
    // Initial greeting from the AI coach
    setTimeout(() => {
      addMessage("Hello! I'm the NHS Inclusion Coach, a confidential space for you to learn and reflect. What's on your mind today?", "ai-message");
    }, 500);

});