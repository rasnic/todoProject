import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProjects,
  setProjects,
  addProject,
} from '../store/slices/projectsSlice';
import { getTasks, setTasks } from '../store/slices/tasksSlice';
import { setUsers } from '../store/slices/usersSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import { post, get } from '../utils/api';

function ProjectsPage() {
  const [projectsList, setProjectsList] = useState();
  const [tasksList, setTasksList] = useState();
  const projects = useSelector(getProjects);
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    if (!tasks.length) {
      get('data').then((data) => {
        dispatch(setTasks(data.tasks));
        dispatch(setUsers(data.users));
        dispatch(setProjects(data.projects));
        setProjectsList(data.projects);
        setTasksList(data.tasks);
      });
    } else {
      setProjectsList(projects);
      setTasksList(tasks);
    }
  }, []);
  const getTaskCounts = (projectId) => {
    const projectTasks = tasksList.filter((task) => task.project === projectId);
    const totalTasks = projectTasks.length;
    const toDoTasks = projectTasks.filter((task) => task.status === 1).length;
    const inProgressTasks = projectTasks.filter(
      (task) => task.status === 2
    ).length;
    const completedTasks = projectTasks.filter(
      (task) => task.status === 3
    ).length;
    return { totalTasks, toDoTasks, inProgressTasks, completedTasks };
  };

  const handleAddProject = async () => {
    if (newProjectName.trim()) {
      const newProject = { name: newProjectName };
      const res = await post('project', newProject);
      if (res) {
        dispatch(addProject(newProject));
        setNewProjectName('');
      }
    }
  };

  return (
    <div>
      <h1 className='text-2xl mb-4'>Projects</h1>
      <div className='mb-4'>
        <TextField
          label='New Project Name'
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          variant='outlined'
          fullWidth
          margin='normal'
        />
        <Button variant='contained' color='primary' onClick={handleAddProject}>
          Add Project
        </Button>
      </div>
      <TableContainer component={Paper}>
        {projectsList && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Total Tasks</TableCell>
                <TableCell>To Do Tasks</TableCell>
                <TableCell>In Progress Tasks</TableCell>
                <TableCell>Completed Tasks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectsList.map((project) => {
                const {
                  totalTasks,
                  toDoTasks,
                  inProgressTasks,
                  completedTasks,
                } = getTaskCounts(project._id);
                return (
                  <TableRow key={project._id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{totalTasks}</TableCell>
                    <TableCell>{toDoTasks}</TableCell>
                    <TableCell>{inProgressTasks}</TableCell>
                    <TableCell>{completedTasks}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

export default ProjectsPage;
