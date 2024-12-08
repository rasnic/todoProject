import { useState } from 'react';
import LoginCard from '../components/LoginCard/LoginCard';
import LogInLayout from '../layouts/LogInLayout';
import { validateLogin, validateRegister } from '../utils/utils';
import { postWithoutAuth } from '../utils/http';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SnackbarActivation from '../components/Snackbar/Snackbar';
import { setUsers } from '../store/slices/usersSlice';

function LoginPage() {
  const [view, setView] = useState('login');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateLoginInput = (data) => {
    let validationResult;
    if (view === 'login') {
      validationResult = validateLogin(data);
    } else {
      validationResult = validateRegister(data);
    }
    if (validationResult) {
      setError(validationResult);
    } else if (view === 'login') {
      login(data);
    } else {
      register(data);
    }
  };
  const login = (data) => {
    postWithoutAuth('login', data).then((res) => {
      debugger;
      dispatch(setUsers(res.users));
      navigate('/');
    });
  };
  const register = (data) => {
    postWithoutAuth('register', data).then((res) => {
      setOpen(true);
    });
    setView('login');
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <LogInLayout>
      <LoginCard
        type={view}
        onButtonClick={validateLoginInput}
        onChangeType={() => setView(view === 'login' ? 'register' : 'login')}
        error={error}
      />
      <SnackbarActivation
        text='Successfully registered'
        variant='success'
        openSnackbar={open}
        handleClose={handleClose}
      />
    </LogInLayout>
  );
}
export default LoginPage;
