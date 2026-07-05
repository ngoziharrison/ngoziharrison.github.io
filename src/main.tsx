import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Research } from "./Pages/Research.tsx"
import { CriticalAIStudies } from './Pages/Classes/critical-ai-studies.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="research" element={<Research />} />
        <Route path="teaching" >
          <Route path="critical-ai-studies" element={<CriticalAIStudies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)