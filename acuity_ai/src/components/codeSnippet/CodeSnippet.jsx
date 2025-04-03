import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import DOMPurify from "dompurify";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";
import "./codeSnippet.css";

const CodeSnippet = ({ code, language = "javascript", darkMode = true, explanation }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formattedCode, setFormattedCode] = useState("");

  useEffect(() => {
    const formatCode = async () => {
      try {
        // Clean up the code first (remove <br/> tags and extra whitespace)
        let cleanedCode = code.replace(/<br\/>/g, '\n').trim();
        
        const supportedLanguages = ["javascript", "html", "css"];
        if (supportedLanguages.includes(language)) {
          const formatted = await prettier.format(cleanedCode, {
            parser: language === "javascript" ? "babel" : language,
            plugins: [parserBabel, parserHtml, parserCss],
          });
          setFormattedCode(formatted);
        } else {
          setFormattedCode(cleanedCode);
        }
      } catch (error) {
        console.error("Formatting Error:", error);
        setFormattedCode(code.replace(/<br\/>/g, '\n').trim());
      }
    };

    formatCode();
  }, [code, language]);

  useEffect(() => {
    if (codeRef.current && formattedCode) {
      Prism.highlightElement(codeRef.current);
    }
  }, [formattedCode, language, darkMode]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderExplanation = () => {
    if (!explanation) return null;
    
    const sanitizedExplanation = DOMPurify.sanitize(
      explanation.replace(/<br\/>/g, '\n')
    );
    
    return (
      <div className="explanation-container">
        <h4>Explanation:</h4>
        <div 
          className="explanation-content"
          dangerouslySetInnerHTML={{ __html: sanitizedExplanation }}
        />
      </div>
    );
  };

  if (!formattedCode) {
    return <div>Loading code...</div>;
  }

  return (
    <div className={`code-snippet ${darkMode ? "dark" : "light"}`}>
      <div className="code-header">
        <span className="language-label">{language.toUpperCase()}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
      <pre className={`code-container ${isMobile ? "vertical" : "horizontal"}`}>
        <code
          ref={codeRef}
          className={`language-${language}`}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              DOMPurify.sanitize(formattedCode),
              Prism.languages[language] || Prism.languages.javascript,
              language
            ),
          }}
        />
      </pre>
      {renderExplanation()}
    </div>
  );
};

export default CodeSnippet;