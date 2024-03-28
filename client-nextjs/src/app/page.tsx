"use client";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

async function sendMessage(message: string) {
  try {
    const res = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data.message;
  } catch (error) {
    console.error(error);
    return "Sorry, I can't undestand your message.";
  }
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    scrollToBottom();
  };

  async function handleSendMessage() {
    if (inputValue.trim() !== "") {
      const userMessage = inputValue;
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setInputValue("");
      setIsBotResponding(true);

      const response = await sendMessage(userMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: "bot" },
      ]);

      scrollToBottom();
      setIsBotResponding(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-end bg-gray-100 p-4">
      <div className="w-full lg:w-1/2 mx-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-4 pb-96">
            <h1 className="text-2xl font-bold mb-4">
              How can I help you today?
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p>Can you suggest one sci-fi movie?</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p>Can you suggest one pop music?</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p>Tell me a funny meme.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p>Tell me one horror book.</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div key={index} className="flex justify-start pb-6">
              <div className="bg-white rounded-lg p-2 max-w-md mr-auto">
                <div className="flex items-center mb-1">
                  <img
                    src={message.sender === "user" ? "/user.svg" : "/bot.svg"}
                    alt={
                      message.sender === "user" ? "User Avatar" : "Bot Avatar"
                    }
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  <span className="font-semibold">
                    {message.sender === "user" ? "You" : "Bot"}
                  </span>
                </div>
                <div
                  className="pl-8
                "
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isBotResponding && (
          <div className="flex justify-self-start pb-6">
            <div className="animate-pulse bg-gray-300 rounded-lg p-2 max-w-md">
              <span>The bot is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
        <div className="relative flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-0 top-0 text-white rounded-r-lg px-4 py-2"
          >
            <img
              className="fill-current w-6"
              src="/up.svg"
              alt="Send Message Icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
