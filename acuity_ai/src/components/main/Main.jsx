import React, { useContext, useState, useRef, useEffect } from "react";
import "./main.css";
import { assets } from "../../assets/icons/assets";
import { Context } from "../../context/Context";
import CodeSnippet from "../codeSnippet/CodeSnippet";
import useMobileDetect from "../../hooks/useMobileDetect";
import UserProfile from "../userProfile/UserProfile";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    clearConversation,
  } = useContext(Context);

  const { isMobile } = useMobileDetect();
  const [isRecording, setIsRecording] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) return JSON.parse(savedMode);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const fileInputRef = useRef(null);
  const resultEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Toggle mobile sidebar visibility
  const [showSidebar, setShowSidebar] = useState(false);

  // Initialize Prism for code highlighting
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("prismjs").then((Prism) => {
        Prism.highlightAll();
      });
    }
  }, [resultData, darkMode]);

  // Speech recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setInput]);

  // Dark mode handling
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark-mode", darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSend = () => {
    if (imagePreview) {
      const message = input ? input : "Analyze the attached image";
      onSent(message, imagePreview); // Pass image data to context
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      onSent(input);
    }
  };

  const copyToClipboard = () => {
    if (!resultData) return;

    const temp = document.createElement("div");
    temp.innerHTML = resultData;
    const textToCopy = temp.textContent || temp.innerText || "";

    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    });
  };

  useEffect(() => {
    if (showResult && !loading) {
      resultEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showResult, loading, resultData]);

  const renderResultContent = () => {
    if (!resultData) return null;

    const parts = resultData.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const languageMatch = part.match(/^```(\w+)/);
        const language = languageMatch ? languageMatch[1] : "javascript";
        const code = part.replace(/^```[\w]*\n/, "").replace(/```$/, "");

        return (
          <CodeSnippet
            code={code}
            language={language}
            explanation={explanation}
            darkMode={true}
          />
        );
      }
      return (
        <div
          key={`text-${index}`}
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    });
  };

  // Random prompt generator
  const generateRandomPrompts = () => {
    const categories = [
      { name: "Programming", icon: assets.code_icon, color: "#00FF9C" },
      { name: "Math", icon: assets.compass_icon, color: "#3D3B40" },
      { name: "Education", icon: assets.bulb_icon, color: "#16C47F" },
      { name: "Language", icon: assets.message_icon, color: "#261FB3" },
      {
        name: "General Knowledge",
        icon: assets.general_icon,
        color: "#73EC8B",
      },
    ];

    const programmingPrompts = [
      "Explain the difference between let, const, and var in JavaScript",
      "How do I implement a binary search algorithm in Python?",
      "What are React hooks and when should I use them?",
      "Show me an example of async/await in TypeScript",
      "How can I optimize SQL queries for better performance?",
    ];

    const mathPrompts = [
      "Solve the equation 3x² - 5x + 2 = 0",
      "Explain the Pythagorean theorem with an example",
      "What's the derivative of sin(x)cos(x)?",
      "How do I calculate the area of a circle with diameter 10cm?",
      "Explain matrix multiplication with a 2x2 example",
    ];

    const educationPrompts = [
      "What are the key principles of constructivist learning theory?",
      "Explain Bloom's taxonomy of learning objectives",
      "How does spaced repetition improve memory retention?",
      "What are the benefits of project-based learning?",
      "Compare and contrast behaviorism and cognitivism",
    ];

    const languagePrompts = [
      "What's the difference between active and passive voice?",
      "Explain the subjunctive mood in English grammar",
      "Give me 5 common French phrases for travelers",
      "How do I use the present perfect tense correctly?",
      "What are some tips for improving English pronunciation?",
    ];

    const generalPrompts = [
      "What are the symptoms of vitamin D deficiency?",
      "Explain how blockchain technology works",
      "What's the history of the Roman Empire?",
      "How do I start investing in the stock market?",
      "What are some effective time management techniques?",
    ];

    const allPrompts = [
      ...programmingPrompts.map((p) => ({
        prompt: p,
        category: categories[0],
      })),
      ...mathPrompts.map((p) => ({ prompt: p, category: categories[1] })),
      ...educationPrompts.map((p) => ({ prompt: p, category: categories[2] })),
      ...languagePrompts.map((p) => ({ prompt: p, category: categories[3] })),
      ...generalPrompts.map((p) => ({ prompt: p, category: categories[4] })),
    ];

    // Shuffle array and pick first 6
    return [...allPrompts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((item, index) => ({
        prompt: item.prompt,
        icon: item.category.icon,
        category: item.category.name,
        color: item.category.color,
      }));
  };

  const [promptCards, setPromptCards] = useState(generateRandomPrompts());

  // Regenerate prompts when returning to home view
  useEffect(() => {
    if (!showResult) {
      setPromptCards(generateRandomPrompts());
    }
  }, [showResult]);

  const parseResponse = (response) => {
    // Check if response contains code blocks
    const codeBlockRegex = /```(\w*)([\s\S]*?)```/;
    const match = response.match(codeBlockRegex);

    if (match) {
      const language = match[1] || "javascript";
      const code = match[2].trim();
      const explanation = response.replace(codeBlockRegex, "").trim();
      return { code, language, explanation };
    }

    // If no code blocks found, treat entire response as explanation
    return { code: "", language: "text", explanation: response };
  };

  // Usage example:
  const response = `Formatted Response: \`\`\`html
  <!DOCTYPE html>
  <html>
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML page.</p>
  </body>
  </html>
  \`\`\`
  
  <b>Explanation:</b>
  
  * <b>\`<!DOCTYPE html>\`</b>: Tells the browser...`;

  const { code, language, explanation } = parseResponse(response);

  return (
    <div className={`main ${darkMode ? "dark-mode" : ""}`}>
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className="mobile-menu-button"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <img src={assets.menu_icon} alt="Menu" />
        </button>
      )}

      <div className="nav">
        <p className="app-name">Acuity AI</p>
        <div className="nav-right">
          {showResult && (
            <button
              className="clear-btn"
              onClick={clearConversation}
              aria-label="New chat"
            >
              <img src={assets.plus_icon} className="clear-icon" alt="Clear" />
              {!isMobile && <span>New Chat</span>}
            </button>
          )}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <img
              src={darkMode ? assets.sun_icon : assets.moon_icon}
              alt={darkMode ? "Light mode" : "Dark mode"}
            />
          </button>
          <UserProfile />
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <h1>
                <span>Hello, Dev</span>
              </h1>
              <p className="subtitle">How can I help you today?</p>
            </div>
            <div className="cards">
              {promptCards.map((card, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => setInput(card.prompt)}
                  style={{ "--card-color": card.color }}
                >
                  <p>{card.prompt}</p>
                  <div className="card-footer">
                    <span className="card-category">{card.category}</span>
                    <img
                      src={card.icon}
                      alt={card.category}
                      style={{ backgroundColor: card.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" className="user-avatar" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img
                src={assets.gemini_icon}
                alt="Acuity AI"
                className="ai-avatar"
              />
              {loading ? (
                <div className="loader">
                  <div className="loading-dots">
                    <span style={{ "--delay": "0s" }}></span>
                    <span style={{ "--delay": "0.2s" }}></span>
                    <span style={{ "--delay": "0.4s" }}></span>
                  </div>
                  <p className="loading-text">Acuity is thinking...</p>
                </div>
              ) : (
                <div className="result-content">
                  {renderResultContent()}
                  <button
                    className="copy-btn"
                    onClick={copyToClipboard}
                    aria-label="Copy to clipboard"
                  >
                    <img src={assets.copy_icon} alt="Copy" />
                  </button>
                  {showCopyNotification && (
                    <div className="copy-notification">
                      Copied to clipboard!
                    </div>
                  )}
                </div>
              )}
            </div>
            <div ref={resultEndRef} />
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box-container">
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button onClick={removeImage} className="remove-image-btn">
                ×
              </button>
            </div>
          )}
            <div
              className={`search-box ${input || imagePreview ? "has-input" : ""}`}
            >
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Message Acuity AI..."
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
              />
              <div className="search-actions">
                {(input || imagePreview) && (
                  <button
                    className="clear-input"
                    onClick={() => {
                      setInput("");
                      removeImage();
                    }}
                    aria-label="Clear input"
                  >
                    <img
                      src={assets.clear_icon}
                      className="clear-icon"
                      alt="Clear"
                    />
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="icon-btn"
                  aria-label="Upload image"
                >
                  <img src={assets.gallery_icon} alt="Upload" />
                </label>
                <button
                  className={`icon-btn mic-btn ${isRecording ? "recording" : ""}`}
                  onClick={toggleSpeechRecognition}
                  aria-label={
                    isRecording ? "Stop recording" : "Start recording"
                  }
                >
                  <img src={assets.mic_icon} alt="Microphone" />
                  {isRecording && <span className="pulse-ring"></span>}
                </button>
                <button
                  className="icon-btn send-btn"
                  onClick={handleSend}
                  disabled={!input.trim() && !imagePreview}
                  aria-label="Send message"
                >
                  <img src={assets.send_icon} alt="Send" />
                </button>
              </div>
            </div>
            <div className="prompt-info">
              <p className="bottom-info">
                Acuity AI may make mistakes. Double-check important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
