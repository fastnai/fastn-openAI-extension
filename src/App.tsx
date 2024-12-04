import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useApiKey } from "./context/ApiKeyContext";
import ApiKeySetup from "./pages/ApiKeySetup";
import Summary from "./pages/Summary";

function App() {
  const { apiKey } = useApiKey();

  return (
    <div className="absolute right-4 min-h-[400px]">
      <Routes>
        <Route
          path="/"
          element={apiKey ? <Summary /> : <Navigate to="/setup" replace />}
        />
        <Route path="/setup" element={<ApiKeySetup />} />
      </Routes>
    </div>
  );
}

export default App;
