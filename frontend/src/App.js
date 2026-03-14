import { BrowserRouter, Routes, Route } from "react-router-dom";
import IssuesPage from "./pages/IssuesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
 return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/issues" element={<IssuesPage />} />

      </Routes>

    </BrowserRouter>

  );
}


export default App;