// script.js

// Mock Data
const contacts = [
    {
        name: 'Student 1',
        profilePic: 'https://th.bing.com/th/id/OIP.M189YlKQNYnC0pjhiLpJDQAAAA?rs=1&pid=ImgDetMain',
        lastMessage: 'See you soon!',
        messages: [
            { type: 'received', text: 'Hey, are we still on for tonight?', time: '10:00 AM' },
            { type: 'sent', text: 'Yes, absolutely!', time: '10:05 AM' },
            { type: 'received', text: 'Great! See you soon!', time: '10:07 AM' },
        ],
        status: 'online'
    },
    {
        name: 'Student 2',
        profilePic: 'https://tse1.mm.bing.net/th?id=OIP.i1fO1rc4bKQ5rmPiBRLWxwHaGR&pid=Api&P=0&h=220',
        lastMessage: 'Don\'t forget the documents.',
        messages: [
            { type: 'sent', text: 'I have sent you the documents.', time: '9:00 AM' },
            { type: 'received', text: 'Got them. Thanks!', time: '9:05 AM' },
            { type: 'received', text: 'Don\'t forget the documents.', time: '9:07 AM' },
        ],
        status: 'last seen yesterday at 8:00 PM'
    },
    // Add more contacts as needed
];

let currentChatIndex = null;

// Initialize Contacts
const contactsDiv = document.getElementById('contacts');
contacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.innerHTML = `
        <img src="${contact.profilePic}" alt="${contact.name}" class="profile-pic">
        <div class="contact-info">
            <h4>${contact.name}</h4>
            <p>${contact.lastMessage}</p>
        </div>
    `;
    contactDiv.addEventListener('click', () => openChat(index));
    contactsDiv.appendChild(contactDiv);
});

// Open Chat
function openChat(index) {
    currentChatIndex = index;
    const chatName = document.getElementById('chat-name');
    const chatStatus = document.getElementById('chat-status');
    const chatProfilePic = document.getElementById('chat-profile-pic');
    const messageInput = document.getElementById('message-input');

    chatName.textContent = contacts[index].name;
    chatStatus.textContent = contacts[index].status;
    chatProfilePic.src = contacts[index].profilePic;
    messageInput.disabled = false;
    messageInput.value = '';

    // Display Messages
    const chatMessagesDiv = document.getElementById('chat-messages');
    chatMessagesDiv.innerHTML = '';
    contacts[index].messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', message.type);
        messageDiv.innerHTML = `
            ${message.text}
            <div class="time">${message.time}</div>
        `;
        chatMessagesDiv.appendChild(messageDiv);
    });

    // Scroll to bottom
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

// Send Message
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);

const messageInput = document.getElementById('message-input');
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    if (currentChatIndex === null) return;

    const text = messageInput.value.trim();
    if (text === '') return;

    const currentTime = new Date();
    const timeString = currentTime.getHours() + ':' + currentTime.getMinutes().toString().padStart(2, '0');

    // Add message to chat area
    const chatMessagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'sent');
    messageDiv.innerHTML = `
        ${text}
        <div class="time">${timeString}</div>
    `;
    chatMessagesDiv.appendChild(messageDiv);

    // Scroll to bottom
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

    // Clear input
    messageInput.value = '';

    // Update last message in contacts
    contacts[currentChatIndex].lastMessage = text;
    contacts[currentChatIndex].messages.push({ type: 'sent', text, time: timeString });
    updateContactList();

    // Simulate reply
    setTimeout(() => {
        simulateReply(currentChatIndex);
    }, 1000);
}

// Update Contact List
function updateContactList() {
    contactsDiv.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `
            <img src="${contact.profilePic}" alt="${contact.name}" class="profile-pic">
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p>${contact.lastMessage}</p>
            </div>
        `;
        contactDiv.addEventListener('click', () => openChat(index));
        contactsDiv.appendChild(contactDiv);
    });
}

// Simulate Reply
function simulateReply(index) {
    const replies = [
        'Okay!',
        'Sounds good.',
        'I will check and get back to you.',
        'Thank you!',
        'Can we talk later?',
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const currentTime = new Date();
    const timeString = currentTime.getHours() + ':' + currentTime.getMinutes().toString().padStart(2, '0');

    contacts[index].messages.push({ type: 'received', text: randomReply, time: timeString });
    contacts[index].lastMessage = randomReply;
    updateContactList();

    if (currentChatIndex === index) {
        const chatMessagesDiv = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'received');
        messageDiv.innerHTML = `
            ${randomReply}
            <div class="time">${timeString}</div>
        `;
        chatMessagesDiv.appendChild(messageDiv);

        // Scroll to bottom
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
}
