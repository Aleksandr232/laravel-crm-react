import { Route, Routes, BrowserRouter } from "react-router-dom";
import Registration from "./pages/Registr/Registration";
import SignGoogle from "./components/Authorization/SignGoogle";
import GoogleCallback from "./components/Authorization/GoogleCalback";
import Authorization from "./pages/Auth/Authorization";
import SignYandex from "./components/Authorization/SignYandex";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorization />} index />
          <Route path="/register" element={<Registration />} />
          <Route path="/auth" element={<SignGoogle />} />
          <Route path="/auth/yandex" element={<SignYandex />} />
          <Route path="/auth/google" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
