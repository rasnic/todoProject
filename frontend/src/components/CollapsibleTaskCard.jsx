import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Select from 'react-select';
import { priorityStatus } from '../utils/consts';
function CollapsibleTaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  projects,
  users,
  tasks,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusOptions = [
    { value: 1, label: 'To Do' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Done' },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const editTaskStatus = (status) => {
    onStatusChange(task._id, status);
  };

  return (
    <Card className='mb-4'>
      <CardActions className='flex justify-between items-center'>
        <Typography variant='h6'>{task.title}</Typography>
        <div className='flex flex-row'>
          <Select
            options={statusOptions}
            onChange={(e) => editTaskStatus(e.value)}
            value={statusOptions?.find((p) => p.value === task.status)}
            menuPortalTarget={document.body}
            menuPosition='fixed'
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
          <IconButton onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(task._id)} sx={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
      </CardActions>
      {isExpanded && (
        <CardContent>
          {task.project && (
            <Typography variant='body2' className='mb-2'>
              <strong>Project:</strong>{' '}
              {projects.find((p) => p._id === task.project)?.name}
            </Typography>
          )}
          {task.due_date && (
            <Typography variant='body2' className='mb-2'>
              <strong>Due Date:</strong>{' '}
              {new Date(task.due_date).toLocaleString()}
            </Typography>
          )}
          {task.priority && (
            <Typography variant='body2' className='mb-2'>
              <strong>Priority:</strong> {priorityStatus[task.priority]}
            </Typography>
          )}
          {task.assignee && (
            <Typography variant='body2' className='mb-2'>
              <strong>Assignee:</strong>{' '}
              {users.find((u) => u._id === task.assignee)?.name}
            </Typography>
          )}
          {task.created_by && (
            <Typography variant='body2' className='mb-2'>
              <strong>Created By:</strong>{' '}
              {users.find((u) => u._id === task.created_by)?.name}
            </Typography>
          )}
          {task.task_dependency?.length > 0 && (
            <Typography variant='body2' className='mb-2'>
              <strong>Task Dependencies:</strong>{' '}
              {tasks
                .filter((t) => task.task_dependency.includes(t._id))
                .map((t) => t.title)
                .join(', ')}
            </Typography>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default CollapsibleTaskCard;
