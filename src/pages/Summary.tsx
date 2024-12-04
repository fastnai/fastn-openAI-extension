import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiKey } from "../context/ApiKeyContext";
import Button from "../components/Button";
import { summarizeWebpage } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Summary() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // State to handle "Copied" label
  const { apiKey, model } = useApiKey();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setUrl(tabs[0].url);
        }
      });
    } else {
      setUrl("https://en.wikipedia.org/wiki/Gilles_de_Rais#Criminal_life");
    }
  }, []);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (!apiKey || !model) {
        throw new Error("API key not found");
      }
      const result = await summarizeWebpage(url, apiKey, model);
      setSummary(result);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setIsCopied(true); // Set "Copied" state to true
    setTimeout(() => setIsCopied(false), 1000); // Reset back to "Copy" after 5 seconds
  };

  return (
    <div className="absolute right-0 top-1 w-[350px] h-[550px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-lg rounded-[10px] p-4 space-y-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="flex justify-center mb-8">
          <img
            src="../../public/bot.png"
            alt="Webpage Summarizer Logo"
            className="h-16 w-auto"
          />
        </div>
        <Button
          variant="black"
          size="medium"
          onClick={() => navigate("/setup")}
        >
          Change API Key
        </Button>
      </div>

      <div className="bg-gray-100 p-3 rounded-md">
        <p className="text-sm text-gray-600 truncate">Current URL: {url}</p>
      </div>

      <Button
        onClick={handleSummarize}
        isLoading={isLoading} // Pass isLoading to show the spinner
        className="w-full"
      >
        {isLoading ? <LoadingSpinner size="small" /> : "Summarize Page"}{" "}
        {/* Conditionally render spinner */}
      </Button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {summary && !error && (
        <div className="relative mt-4 p-4 bg-gray-50 rounded-lg shadow h-[300px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
          <div className="sticky bottom-0 pt-2">
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
              onClick={handleCopy}
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
