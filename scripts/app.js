//DOM queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

//Update name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    //show then hide the update message
    updateMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMessage.innerText = '', 3000);
});

//update chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);

//Get chats and render
chatroom.getChats(data => chatUI.render(data));

