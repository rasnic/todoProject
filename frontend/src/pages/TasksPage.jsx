import { useState, useEffect } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import CloseableCard from '../components/CloseableCard';
import DropdownComponent from '../components/DropdownComponent';
import { post, get, patch, remove } from '../utils/api';
import { setUsers, getUsers } from '../store/slices/usersSlice';
import { setProjects, getProjects } from '../store/slices/projectsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTasks,
  getTasks,
  addTask,
  updateTask,
  removeTask,
} from '../store/slices/tasksSlice';
import Select from 'react-select';
import { priorityStatus } from '../utils/consts';
import { optionsToSelectOptions, formatDate } from '../utils/utils';
import SnackbarActivation from '../components/Snackbar';
import CollapsibleTaskCard from '../components/CollapsibleTaskCard';

function TasksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSmallView, setIsSmallView] = useState(window.innerWidth < 900);
  const [tasksList, setTasksList] = useState();
  const [task, setTask] = useState({});
  const [sidebarType, setSidebarType] = useState('add');
  const tasksState = useSelector(getTasks);
  const usersState = useSelector(getUsers);
  const projectsState = useSelector(getProjects);
  const [open, setOpen] = useState({ isOpen: false, type: '', message: '' });
  const dispatch = useDispatch();

  const tasksOptions = tasksList?.reduce((acc, task) => {
    acc.push({ label: task.title, value: task._id });
    return acc;
  }, []);

  const optionsUsers = usersState?.reduce((acc, user, idx) => {
    if (idx === 0) {
      acc.push({ label: 'Me', value: user._id });
    } else {
      acc.push({ label: user.name, value: user._id });
    }
    return acc;
  }, []);
  const optionsProjects = projectsState?.reduce((acc, project) => {
    acc.push({ label: project.name, value: project._id });
    return acc;
  }, []);
  useEffect(() => {
    if (!tasksState.length) {
      get('data').then((data) => {
        dispatch(setTasks(data.tasks));
        dispatch(setUsers(data.users));
        dispatch(setProjects(data.projects));
        setTasksList(data.tasks);
      });
    } else {
      setTasksList(tasksState);
    }
  }, []);
  const toggleSidebar = () => {
    setSidebarType('add');
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSmallView(true);
      } else {
        setIsSmallView(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleAdd(c) {
    if (!task.title) return;
    pushTask();
    setTask({ title: '' });
    if (!c) setIsSidebarOpen(false);
  }
  async function handleEdit() {
    const { _id, __v, ...edittedTask } = task;
    if (edittedTask.due_date && new Date(edittedTask.due_date)) {
      edittedTask.due_date = new Date(edittedTask.due_date);
    } else if (edittedTask.due_date) {
      delete edittedTask.due_date;
    }
    const res = await patch(`task/${task._id}`, edittedTask);
    if (res) {
      setOpen({
        isOpen: true,
        type: 'info',
        message: `task edited successfully`,
      });
      setTasksList(tasksList.map((t) => (t._id === task._id ? { ...res } : t)));
      dispatch(updateTask(res));
      setTask({});
      setIsSidebarOpen(false);
      setSidebarType('add');
    }
  }
  const pushTask = async () => {
    const edittedTask = { ...task, created_by: usersState[0]?._id };
    if (edittedTask.due_date && new Date(edittedTask.due_date)) {
      edittedTask.due_date = new Date(edittedTask.due_date);
    } else if (edittedTask.due_date) {
      delete edittedTask.due_date;
    }
    const res = await post('task', edittedTask);
    if (res) {
      setOpen({
        isOpen: true,
        type: 'info',
        message: `task added successfully`,
      });
      setTasksList([res, ...tasksList]);
      dispatch(addTask(res));
    }
  };
  const editAddedTask = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  const handleClose = () => {
    setOpen({ isOpen: false, type: '', message: '' });
  };

  const handleSearchChange = (e) => {
    if (e.target.value) {
      setTasksList(
        tasksState.filter((t) =>
          t?.title?.toLowerCase()?.includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setTasksList(tasksState);
    }
  };

  const handleEditTask = (t) => {
    setSidebarType('edit');
    setTask(t);
    setIsSidebarOpen(true);
  };
  const handleDeleteTask = async (id) => {
    const res = await remove(`task/${id}`);
    if (res) {
      setTasksList(tasksList.filter((t) => t._id !== id));
      dispatch(removeTask(id));
    }
  };
  const handleStatusChange = async (id, status) => {
    const res = await patch(`task/${id}`, { status });
    if (res) {
      setTasksList(tasksList.map((t) => (t._id === id ? { ...t, status } : t)));
      dispatch(updateTask(res));
      if (status === 3) {
        setOpen({
          isOpen: true,
          type: 'success',
          message: `You have completed the task, great job!`,
        });
      } else {
        setOpen({
          isOpen: true,
          type: 'info',
          message: `Task status updated successfully`,
        });
      }
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SnackbarActivation
        text={open.message}
        variant={open.type}
        openSnackbar={open.isOpen}
        handleClose={handleClose}
      />
      {!(isSmallView && isSidebarOpen) && (
        <div className='w-full relative'>
          <button
            onClick={toggleSidebar}
            className={`absolute top-0 right-4 bg-blue-500 text-black p-2 rounded-full shadow-lg focus:outline-none block}`}
          >
            <AddIcon />
          </button>
          {/* <button
            onClick={toggleFilter}
            className={`absolute top-0 right-16 bg-green-500 text-white p-2 rounded-full shadow-lg focus:outline-none block`}
          >
            <FilterIcon />
          </button> */}
          <h1 className='text-2xl mb-2'>Tasks</h1>
          <TextField
            placeholder='Search tasks'
            variant='outlined'
            margin='normal'
            className='bg-white'
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {isFilterOpen && (
            <CloseableCard
              title='Filter and Sort Tasks'
              closeCard={toggleFilter}
            ></CloseableCard>
          )}
          <div>
            {tasksList
              ? tasksList.map((t) => (
                  <CollapsibleTaskCard
                    key={t._id}
                    task={t}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                    users={usersState}
                    projects={projectsState}
                    tasks={tasksList}
                  />
                ))
              : null}
          </div>
        </div>
      )}
      {isSidebarOpen && <main className='flex-grow p-2'></main>}
      {isSidebarOpen && (
        <aside
          className={`bg-white p-4 transition-all duration-300 ${
            isSidebarOpen ? 'w-full' : 'w-0'
          } overflow-hidden shadow-lg`}
        >
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl'>
              {`${sidebarType === 'add' ? 'Add' : 'Edit'}`} Task
            </h2>
            <button
              onClick={toggleSidebar}
              className='text-gray-600 focus:outline-none'
            >
              <CloseIcon />
            </button>
          </div>
          <TextField
            label='Task'
            variant='outlined'
            fullWidth
            value={task.title}
            error={!task?.title}
            helperText={!task?.title && 'Task title is required'}
            onChange={(e) => editAddedTask('title', e.target.value)}
            className='mb-4'
          />
          <DropdownComponent
            defaultOpen={sidebarType === 'edit'}
            title='Additional Details'
          >
            <div>
              <label className='block'>Due Date</label>{' '}
              <TextField
                type='datetime-local'
                value={formatDate(task.due_date) || ''}
                onChange={(e) => editAddedTask('due_date', e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin='normal'
                variant='outlined'
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>Priority</label>
              <Select
                options={optionsToSelectOptions(priorityStatus)}
                placeholder='Select Priority'
                onChange={(e) => editAddedTask('priority', e.value)}
                value={optionsToSelectOptions(priorityStatus)?.find(
                  (p) => p.value === task.priority
                )}
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>Task Dependency</label>
              <Select
                options={tasksOptions.filter((t) => t.value !== task._id)}
                isMulti
                className='mt-2'
                closeMenuOnSelect={false}
                value={tasksOptions?.filter((t) =>
                  task.task_dependency?.includes(t.value)
                )}
                placeholder='Depend on tasks:'
                onChange={(e) =>
                  editAddedTask(
                    'task_dependency',
                    e.map((i) => i.value)
                  )
                }
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>Assignee</label>
              <Select
                options={optionsUsers}
                className='mt-2'
                placeholder='Assign to:'
                value={optionsUsers?.find((u) => u.value === task.assignee)}
                onChange={(e) => editAddedTask('assignee', e.value)}
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>Project</label>
              <Select
                options={optionsProjects}
                className='mt-2'
                placeholder='Project'
                value={optionsProjects?.find((p) => p.value === task.project)}
                onChange={(e) => editAddedTask('project', e.value)}
              />{' '}
            </div>
          </DropdownComponent>
          {!task?._id ? (
            <div className='flex flex-row justify-between my-2'>
              <Button
                variant='contained'
                color='success'
                startIcon={<AddIcon />}
                onClick={() => handleAdd(false)}
              >
                Add
              </Button>
              <Button
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                onClick={() => handleAdd(true)}
              >
                Add and Continue
              </Button>
            </div>
          ) : (
            <div>
              {sidebarType === 'edit' && (
                <div className='my-2'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

export default TasksPage;
