import React, { useEffect } from 'react';
import QueryInput from "../queryInput/QueryInput";
import './ChatWindow.css';
import { chatRequest, createChatBox } from '../utils/utils';

interface Props{
    className: string;
    queryInputClassName: string;
}

export default function ChatWindow({className, queryInputClassName}: Props) {

    useEffect(() => {
        const chatHistoryString = localStorage.getItem("chatHistory") || '[]';
        console.log(chatHistoryString);
        let chatHistory: chatRequest[] = JSON.parse(chatHistoryString) || [];
        if((chatHistory.length > 0)&&(chatHistory !== null)) {
          chatHistory.forEach(element => {
            createChatBox(element.query, element.id);
            const content = (document.getElementById(element.id) as HTMLElement);
            content.innerHTML = "";
            content.innerText = element.response;
        });  
        }
      }, []);

    return (
        <div className={className}>
            <div className="chat-window">
                <ul id="chat-window-history" className="chat-window-history"></ul>
                <div className="chat-input">
                    <QueryInput className={queryInputClassName}/>
                </div>
            </div>
        </div>
    );
}
