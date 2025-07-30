import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Layout from './Layout/index.tsx';
import NoPage from './NoPage/index.tsx';
import Home from './Home/index.tsx';
import Presentation from './Presentation/index.tsx';
import Blog from './Blog/index.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="presentation" element={<Presentation />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
