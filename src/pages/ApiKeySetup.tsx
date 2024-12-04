import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiKey } from "../context/ApiKeyContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ApiKeySetup() {
  const [key, setKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo-0125");
  const [error, setError] = useState("");
  const { setApiKey, setModel: setContextModel } = useApiKey();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError("API key is required");
      return;
    }
    setApiKey(key.trim());
    setContextModel(selectedModel); // Set the selected model
    navigate("/");
  };

  return (
    <div className="min-h-[300px] flex flex-col p-1 ">
      {/* Logo Section */}

      {/* API Key Input Section */}
      <div className="flex flex-grow items-center justify-end top-1">
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 w-80 h-[500px] space-y-6">
          <div className="flex justify-center mb-8">
            <img
              src="/bot.png"
              alt="Webpage Summarizer Logo"
              className="h-16 w-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-white ">API Key Setup</h1>
            <p className="mt-2 text-white">
              Enter your API key to start summarizing webpages.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <Input
              label={<span className="text-white">API Key</span>}
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              error={error}
              placeholder="Enter your API key"
            />

            {/* Model Selector Dropdown */}
            <div className="mt-4">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-white"
              >
                Select GPT Model
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="gpt-3.5-turbo-0125">GPT-3.5 Turbo 0125</option>
                <option value="gpt-3.5-turbo-1106">GPT-3.5 Turbo 1106</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-4-turbo-2024-04-09">
                  GPT-4 Turbo 2024-04-09
                </option>
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4o-2024-11-20">GPT-4o 2024-11-20</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Save API Key
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
