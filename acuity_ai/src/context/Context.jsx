import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";
import "katex/dist/katex.min.css";
import katex from "katex";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme for syntax highlighting

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState(() => {
        return JSON.parse(localStorage.getItem("prevPrompts")) || []; // ✅ Load from localStorage
    });
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Save prevPrompts to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
    }, [prevPrompts]);

    const animateResponse = (formattedResponse) => {
        setResultData("");
        const words = formattedResponse.split(" ");
        words.forEach((word, index) => {
            setTimeout(() => {
                setResultData((prev) => prev + word + " ");
            }, index * 50);
        });
    };

    const formatResponse = (response) => {
        if (!response) return "";

        let formattedResponse = response;

        formattedResponse = formattedResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        formattedResponse = formattedResponse.replace(/\n/g, "<br/>");

        formattedResponse = formattedResponse.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
            const highlightedCode = Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang || "javascript");
            return `<pre class="language-${lang}"><code>${highlightedCode}</code></pre>`;
        });

        formattedResponse = formattedResponse.replace(/\$\$(.*?)\$\$/gs, (_, math) =>
            `<div class="math-block">${katex.renderToString(math, { throwOnError: false })}</div>`
        );
        formattedResponse = formattedResponse.replace(/\$(.*?)\$/g, (_, math) =>
            `<span class="math-inline">${katex.renderToString(math, { throwOnError: false })}</span>`
        );

        return formattedResponse;
    };

    const onSent = async () => {
        if (!input.trim()) return;

        try {
            setLoading(true);
            setShowResult(true);
            setResultData("");
            setRecentPrompt(input);

            const updatedPrompts = [input, ...prevPrompts.filter((p) => p !== input)]; // Remove duplicates
            setPrevPrompts(updatedPrompts.slice(0, 10)); // ✅ Limit to 10 recent prompts

            const response = await run(input);
            const formattedResponse = formatResponse(response);

            animateResponse(formattedResponse);

            setLoading(false);
            setInput("");
            console.log("Formatted Response:", formattedResponse);
        } catch (error) {
            setLoading(false);
            console.error("Error running Gemini:", error);
            setResultData("⚠️ Something went wrong. Please try again.");
        }
    };

    const deletePrompt = (index) => {
        setPrevPrompts(prev => prev.filter((_, i) => i !== index));
      };

    return (
        <Context.Provider
            value={{
                onSent,
                recentPrompt,
                prevPrompts,
                setRecentPrompt,
                showResult,
                loading,
                resultData,
                input,
                setInput,
                deletePrompt
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
