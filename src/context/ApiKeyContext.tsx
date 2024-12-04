import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  apiKey: string | null;
  model: string | null;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [model, setModelState] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in a Chrome extension environment
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['apiKey', 'model'], (result) => {
        if (result.apiKey) {
          setApiKeyState(result.apiKey);
        }
        if (result.model) {
          setModelState(result.model);
        }
      });
    }
  }, []);

  const setApiKey = (key: string) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ apiKey: key }, () => {
        setApiKeyState(key);
      });
    } else {
      // Fallback for development environment
      setApiKeyState(key);
    }
  };

  const setModel = (model: string) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ model }, () => {
        setModelState(model);
      });
    } else {
      // Fallback for development environment
      setModelState(model);
    }
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, model, setApiKey, setModel }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}
