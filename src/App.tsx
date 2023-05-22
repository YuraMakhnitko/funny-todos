import { Routes, Route } from "react-router";

import "./css/App.css";

import { Home, Register, Login, Settings } from "./pages/index";

import { AnimatedTitle, TitleTabs } from "./compontets/index";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="todo">
        <AnimatedTitle />
        <TitleTabs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
