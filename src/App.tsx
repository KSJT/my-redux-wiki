import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import WikiPage from "./pages/WikiPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ArticlePage from "./pages/WikiPage/ArticlePage/ArticlePage";
import AddPage from "./pages/WikiPage/AddPage/AddPage";
import ReWriteEditor from "./pages/WikiPage/Editor/ReWriteEditor";
import BoardPage from "./pages/BoardPage";
import BoardArticlePage from "./pages/BoardPage/BoardArticlePage";
import BoardAddPage from "./pages/BoardPage/BoardAddPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/:id" element={<ArticlePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<ReWriteEditor />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/board/:id" element={<BoardArticlePage />} />
            <Route path="/board/add" element={<BoardAddPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
