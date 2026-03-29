import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssuesPage from "./pages/IssuesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminUsersPage from "./pages/AdminUsersPage";

function App() {
 return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/issues" element={<IssuesPage />} />

        <Route path="/admin/users" element={<AdminUsersPage />} />

      </Routes>

    </BrowserRouter>

  );
}


export default App;