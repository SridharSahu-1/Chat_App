import { useState } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import axiosInstance from "../lib/axios";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  const [lang, setLang] = useState("");
  const save = async () => {
    await axiosInstance.put("/auth/language", { lang });
    // maybe refresh user store…
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="glass rounded-3xl p-8 fade-scale-in">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gradient-primary mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Customize your ChatVibe experience
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gradient-primary">
                  Theme
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose a theme for your chat interface
                </p>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`
                      group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
                      ${
                        theme === t
                          ? "glass border-primary/50 shadow-glow"
                          : "glass-subtle hover:glass"
                      }
                    `}
                    onClick={() => setTheme(t)}
                  >
                    <div
                      className="relative h-10 w-full rounded-lg overflow-hidden border border-white/20"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium truncate w-full text-center">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Preview Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gradient-primary">
                  Preview
                </h3>
                <div className="glass rounded-2xl border border-white/20 overflow-hidden shadow-elegant">
                  <div className="p-6">
                    <div className="max-w-lg mx-auto">
                      {/* Mock Chat UI */}
                      <div className="glass rounded-2xl shadow-elegant overflow-hidden border border-white/20">
                        {/* Chat Header */}
                        <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-primary/5 to-secondary/5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium shadow-glow">
                              J
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">John Doe</h3>
                              <p className="text-xs text-muted-foreground">
                                Online
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto">
                          {PREVIEW_MESSAGES.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.isSent ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`
                                  max-w-[80%] rounded-xl p-3 shadow-sm
                                  ${
                                    message.isSent
                                      ? "bg-gradient-primary text-white shadow-glow"
                                      : "glass border border-white/20"
                                  }
                                `}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p
                                  className={`
                                    text-[10px] mt-1.5 opacity-70
                                  `}
                                >
                                  12:00 PM
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-white/10 bg-gradient-to-r from-primary/5 to-secondary/5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              className="glass flex-1 text-sm h-10 px-3 rounded-lg border border-white/20 placeholder:text-muted-foreground"
                              placeholder="Type a message..."
                              value="This is a preview"
                              readOnly
                            />
                            <button className="btn-glow h-10 px-4 rounded-lg">
                              <Send size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2>Your Language</h2>
              <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="">Auto</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                {/* …more */}
              </select>
              <button onClick={save}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
