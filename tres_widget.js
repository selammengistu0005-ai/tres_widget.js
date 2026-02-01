(function() {
    // 1. INJECT CSS
    // We create a style tag and append it to the head so the user doesn't need a separate CSS file.
    const style = document.createElement('style');
    style.innerHTML = `
        /* Main Container */
        #tres-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Inter', sans-serif;
        }

        /* The Chat Button (Launcher) */
        #tres-launcher {
            width: 60px;
            height: 60px;
            background: #000;
            border: 1px solid #333;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
        }

        #tres-launcher:hover {
            transform: scale(1.1);
            border-color: #6b4cff; /* Tres Purple */
        }

        /* SVG Icon styling */
        #tres-launcher svg {
            width: 28px;
            height: 28px;
            fill: white;
            transition: 0.3s;
        }

        /* The Chat Window */
        #tres-chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid #333;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 5px 30px rgba(0,0,0,0.5);
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px) scale(0.95);
            transition: all 0.3s ease;
            overflow: hidden;
        }

        #tres-chat-window.open {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0) scale(1);
        }

        /* Header */
        .tres-header {
            background: linear-gradient(90deg, #6b4cff, #000);
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
            border-bottom: 1px solid #333;
        }

        .tres-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }
        
        .tres-header span {
            font-size: 12px;
            color: rgba(255,255,255,0.7);
        }

        /* Chat Body */
        .tres-body {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .tres-message {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.4;
        }

        .tres-message.bot {
            background: #222;
            color: #ddd;
            align-self: flex-start;
            border-bottom-left-radius: 2px;
        }

        .tres-message.user {
            background: #6b4cff;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }

        /* Input Area */
        .tres-footer {
            padding: 15px;
            border-top: 1px solid #333;
            display: flex;
            gap: 10px;
        }

        #tres-input {
            flex: 1;
            background: #111;
            border: 1px solid #333;
            border-radius: 5px;
            padding: 10px;
            color: white;
            outline: none;
        }

        #tres-input:focus {
            border-color: #6b4cff;
        }

        #tres-send-btn {
            background: #6b4cff;
            border: none;
            color: white;
            padding: 0 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }

        #tres-send-btn:hover {
            background: #5a3de0;
        }

        /* Scrollbar */
        .tres-body::-webkit-scrollbar { width: 5px; }
        .tres-body::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; }
    `;
    document.head.appendChild(style);

    // 2. INJECT HTML
    const widgetHTML = `
        <div id="tres-widget-container">
            <div id="tres-chat-window">
                <div class="tres-header">
                    <div>
                        <h3>Tres Support</h3>
                        <span>AI Agent Online</span>
                    </div>
                    <div style="cursor:pointer;" id="tres-close">✕</div>
                </div>
                <div class="tres-body" id="tres-messages">
                    <div class="tres-message bot">Hello. I am the Tres AI. How can I optimize your operations today?</div>
                </div>
                <div class="tres-footer">
                    <input type="text" id="tres-input" placeholder="Type your query...">
                    <button id="tres-send-btn">➤</button>
                </div>
            </div>

            <button id="tres-launcher">
                <svg viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
            </button>
        </div>
    `;

    // Append to body
    const div = document.createElement('div');
    div.innerHTML = widgetHTML;
    document.body.appendChild(div);

    // 3. JAVASCRIPT LOGIC
    const launcher = document.getElementById('tres-launcher');
    const chatWindow = document.getElementById('tres-chat-window');
    const closeBtn = document.getElementById('tres-close');
    const input = document.getElementById('tres-input');
    const sendBtn = document.getElementById('tres-send-btn');
    const messagesContainer = document.getElementById('tres-messages');

    // Toggle Open/Close
    function toggleChat() {
        chatWindow.classList.toggle('open');
    }

    launcher.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Send Message Logic
    function sendMessage() {
        const text = input.value.trim();
        if (text === "") return;

        // 1. Add User Message
        addMessage(text, 'user');
        input.value = "";

        // 2. Simulate AI Typing/Response (This is where you'd connect your API)
        setTimeout(() => {
            // Placeholder logic for now
            addMessage("Searching knowledge base... Request processed.", 'bot');
        }, 1000);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('tres-message', sender);
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Listen for Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    sendBtn.addEventListener('click', sendMessage);

})();