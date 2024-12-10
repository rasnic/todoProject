import { Routes, Route } from 'react-router-dom';
import ConnectedLayout from '../layouts/ConnectedLayout';
import TasksPage from '../pages/TasksPage';
import LoginPage from '../pages/LoginPage';
import ActivityLogPage from '../pages/ActivityLogPage';
import ProjectsPage from '../pages/ProjectsPage';
import LogoutPage from '../pages/LogoutPage';
import UsersPage from '../pages/UsersPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/' element={<ConnectedLayout />}>
        <Route path='tasks' element={<TasksPage />} />
        <Route path='activity' element={<ActivityLogPage />} />
        <Route path='projects' element={<ProjectsPage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='logout' element={<LogoutPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
