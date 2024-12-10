import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { get } from '../utils/api';
import { activityLogTypes } from '../utils/consts';
import { setProjects } from '../store/slices/projectsSlice';
import { getTasks, setTasks } from '../store/slices/tasksSlice';
import { setUsers, getUsers } from '../store/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
function ActivityLogPage() {
  const [activityLogs, setActivityLogs] = useState();
  const [usersList, setUsersList] = useState();
  const tasks = useSelector(getTasks);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!tasks.length) {
      get('data').then((data) => {
        dispatch(setTasks(data.tasks));
        dispatch(setUsers(data.users));
        dispatch(setProjects(data.projects));
        setUsersList(data.users);
      });
    } else {
      setUsersList(users);
    }
  }, []);
  useEffect(() => {
    get('activity')
      .then((data) => {
        setActivityLogs(data.activityLogs);
      })
      .catch((error) => {
        console.error('Error fetching activity logs:', error);
      });
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Activity Log</h1>
      <TableContainer component={Paper}>
        {activityLogs && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Change Type</TableCell>
                <TableCell>Changed By</TableCell>
                <TableCell>Change Time</TableCell>
                {/* <TableCell>Change</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{activityLogTypes[log.change_type]}</TableCell>
                  <TableCell>
                    {usersList?.find((user) => user._id === log.user)?.name}
                  </TableCell>
                  <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

export default ActivityLogPage;
