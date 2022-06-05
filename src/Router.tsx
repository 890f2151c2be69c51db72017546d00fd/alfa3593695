import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create/Create";
import Poker from "./pages/Poker/Poker";

export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Poker />} />
          <Route path="/" element={<Create />} />
        </Routes>
      </BrowserRouter>
    );
  }