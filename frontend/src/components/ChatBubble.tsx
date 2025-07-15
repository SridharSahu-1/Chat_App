import { useState } from "react";
import { Globe, RotateCcw } from "lucide-react";

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
    <div
      // className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      className={`chat ${isOwn ? "chat-end " : "chat-start"}`}
    >
      <div
        className={`
        max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl
        ${isOwn ? "chat-bubble  rounded-br-md" : "chat-bubble  rounded-bl-md"}
        relative group
      `}
      >
        <div className="text-sm leading-relaxed">
          {isTranslated ? (
            <div className="space-y-2">
              <p className={isOwn ? "text-white" : "text-text-primary"}>
                {showOriginal ? message.text : message.translatedText}
              </p>

              <button
                className={`
                  flex items-center gap-1 text-xs transition-colors
                  ${
                    isOwn
                      ? "text-white/70 hover:text-white"
                      : "text-text-muted hover:text-primary"
                  }
                `}
                onClick={() => setShowOriginal(!showOriginal)}
              >
                {showOriginal ? (
                  <>
                    <Globe className="w-3 h-3" />
                    <span>Show Translation</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3 h-3" />
                    <span>Show Original</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <p className={isOwn ? "text-white" : "text-text-primary"}>
              {message.text}
            </p>
          )}
        </div>

        {isTranslated && (
          <div
            className={`
            absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center
            ${isOwn ? "bg-white/20" : "bg-primary/10"}
          `}
          >
            <Globe
              className={`w-2 h-2 ${isOwn ? "text-white" : "text-primary"}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
