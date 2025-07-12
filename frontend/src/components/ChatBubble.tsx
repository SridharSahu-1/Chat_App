import { useState } from "react";

export default function ChatBubble({
  message,
  currentLang,
  isOwn,
}: {
  message: any;
  currentLang: string;
  isOwn: boolean;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const isTranslated = message.translatedText != null;
  
  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>
      <div className="chat-bubble flex flex-col">
        {isTranslated ? (
          <>
            <p>{showOriginal ? message.text : message.translatedText}</p>
            <button
              className="text-xs text-blue-500 mt-1 self-end"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              Show {showOriginal ? "Translation" : "Original"}
            </button>
          </>
        ) : (
          <p>{message.text}</p>
        )}
      </div>
    </div>
  );
}
