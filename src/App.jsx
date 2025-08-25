import AIChat from "./Pages/ChatInterface_AssistAI";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageAIProducts from "./Pages/LandingPage_AIProducts";

function App() {
  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageAIProducts />} />
            <Route path="/assistAI" element={<AIChat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
