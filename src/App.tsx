import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Introduction from './pages/Introduction';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Introduction />} />
          <Route path="docs/:slug" element={<ArticlePage />} />
          <Route path="prompts" element={<div>Prompts Content</div>} />
          <Route path="agents" element={<div>Agents Content</div>} />
          <Route path="protocols" element={<div>Protocols Content</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
