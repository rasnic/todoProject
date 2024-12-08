import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import store from './store/store.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import ActivityLogPage from './pages/ActivityLogPage';
import ProjectsPage from './pages/ProjectsPage';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TasksPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/activity' element={<ActivityLogPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
