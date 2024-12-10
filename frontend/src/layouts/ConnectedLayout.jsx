import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Assignment as TasksIcon,
  ListAlt as ActivityLogIcon,
  Folder as ProjectsIcon,
  Logout as LogoutIcon,
  Person as UsersIcon,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';

function ConnectedLayout() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'bg-gray-700 p-2 rounded flex items-center'
          : 'p-2 rounded flex items-center hover:bg-gray-700'
      }
    >
      <div
        className={`flex items-center justify-center w-8 h-8 ${
          isMinimized && 'py-6'
        }`}
      >
        {icon}
      </div>
      {!isMinimized && <span className='ml-2'>{label}</span>}
    </NavLink>
  );

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside
        className={`bg-gray-800 text-white flex flex-col sticky top-0 h-screen transition-all duration-300 ${
          isMinimized ? 'w-16' : 'w-64'
        } shadow-lg`}
      >
        <div
          className={`flex items-center justify-between ${
            !isMinimized ? 'p-4' : 'py-4 pr-5'
          }`}
          style={{ height: '64px' }}
        >
          <span className='text-2xl font-bold'>
            {!isMinimized && 'Task Manager'}
          </span>
          <button
            onClick={toggleSidebar}
            className='text-white focus:outline-none'
          >
            {isMinimized ? <MenuIcon /> : <CloseIcon />}
          </button>
        </div>
        <nav className='flex flex-col p-4 space-y-2'>
          {isMinimized ? (
            <Tooltip title='Tasks' placement='right' arrow>
              {renderNavLink('/tasks', <TasksIcon />, 'Tasks')}
            </Tooltip>
          ) : (
            renderNavLink('/tasks', <TasksIcon />, 'Tasks')
          )}
          {isMinimized ? (
            <Tooltip title='Activity Log' placement='right' arrow>
              {renderNavLink('/activity', <ActivityLogIcon />, 'Activity Log')}
            </Tooltip>
          ) : (
            renderNavLink('/activity', <ActivityLogIcon />, 'Activity Log')
          )}
          {isMinimized ? (
            <Tooltip title='Projects' placement='right' arrow>
              {renderNavLink('/projects', <ProjectsIcon />, 'Projects')}
            </Tooltip>
          ) : (
            renderNavLink('/projects', <ProjectsIcon />, 'Projects')
          )}
          {isMinimized ? (
            <Tooltip title='Users' placement='right' arrow>
              {renderNavLink('/users', <UsersIcon />, 'Users')}
            </Tooltip>
          ) : (
            renderNavLink('/users', <UsersIcon />, 'Users')
          )}
          {isMinimized ? (
            <Tooltip title='Logout' placement='right' arrow>
              {renderNavLink('/logout', <LogoutIcon />, 'Logout')}
            </Tooltip>
          ) : (
            renderNavLink('/logout', <LogoutIcon />, 'Logout')
          )}
        </nav>
      </aside>
      <main className='flex-grow p-8'>
        <Outlet />
      </main>
    </div>
  );
}

export default ConnectedLayout;
