/* eslint-disable */
export interface chatRequest {
    id: string;
    query: string;
    response: string;
    start: number;
    end: number;
    score: number; 
}

export function addToChatHistory(entry: chatRequest) {
    const chatHistoryString = localStorage.getItem("chatHistory") || '[]';
    let chatHistory: chatRequest[] = JSON.parse(chatHistoryString) || [];

    if((chatHistory.length > 0)&&(chatHistory !== null)) {
        chatHistory.push(entry);
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));


        chatHistory.forEach(element => {
            const content = (document.getElementById(element.id) as HTMLElement);
            content.innerHTML = "";
            content.innerText = element.response;
        });
    }
}

function generateUUID(id: string = "") {
    if(id === "") {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 & 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
          return uuid;
    } else {
        return id;
    }
}

export function createChatBox(prompt: string, uuid: string = "") {

    let chatHistory = (document.getElementById("chat-window-history") as HTMLInputElement);

    let result = document.createElement("li");
    result.style.listStyle = "none";
    const id = generateUUID(uuid);
    console.log(uuid, id);

    result.innerHTML =   `
        <div class="material-card">
        <div class="card-content">
            <span class="card-title">${prompt}</span>
            <div id="${id}" class="card-description">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
        </div>
        </div>
        `
    chatHistory.appendChild(result);
    return id;
}