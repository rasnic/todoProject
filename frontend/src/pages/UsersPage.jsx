import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjects } from '../store/slices/projectsSlice';
import { setTasks } from '../store/slices/tasksSlice';
import { getUsers, setUsers } from '../store/slices/usersSlice';
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
import { timeDifferenceFromNow } from '../utils/utils';

function UsersPage() {
  const [usersList, setUsersList] = useState();
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      get('data').then((data) => {
        dispatch(setTasks(data.tasks));
        dispatch(setUsers(data.users));
        dispatch(setProjects(data.projects));
        setUsersList(data.projects);
      });
    } else {
      setUsersList(users);
    }
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Users</h1>
      <TableContainer component={Paper}>
        {usersList && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {timeDifferenceFromNow(user.last_activity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}

export default UsersPage;
