import { Route, Routes, BrowserRouter } from "react-router-dom";

import Registration from "./pages/Registr/Registration";
import SignGoogle from "./components/Authorization/SignGoogle";
import GoogleCallback from "./components/Authorization/GoogleCallback";
import Authorization from "./pages/Auth/Authorization";
import SignYandex from "./components/Authorization/SignYandex";
import YandexCallback from "./components/Authorization/YandexCallback";

import Home from "./pages/Home/Home";
import Staff from "./pages/Staff/Staff";
import StaffTable from "./pages/Staff/StaffTable";
import WorkLog from "./pages/WorkLog/WorkLog";
import Calendar from "./pages/Calendar/Calendar";
import ClientsWork from "./pages/ClientsWork/ClientsWork";
import Settings from "./pages/Settings/Settings";

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
          <Route path="/auth/yandex/callback" element={<YandexCallback/>} />
          <Route path="/auth/google" element={<GoogleCallback />} />
          <Route path="/home" element={<Home />} />
          <Route path="/staff" element={<Staff/>} />
          <Route path="/staff/table" element={<StaffTable/>} />
          <Route path="/work" element={<WorkLog/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/clients" element={<ClientsWork/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
