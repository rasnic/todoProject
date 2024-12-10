import { useState, useEffect } from 'react';
import LoginCard from '../components/LoginCard';
import { validateLogin, validateRegister } from '../utils/utils';
import { postWithoutAuth } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import SnackbarActivation from '../components/Snackbar';

function LoginPage() {
  const [view, setView] = useState('login');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/tasks');
    }
  }, [navigate]);

  const validateLoginInput = (data) => {
    let validationResult;
    if (view === 'login') {
      validationResult = validateLogin(data);
    } else {
      validationResult = validateRegister(data);
    }
    if (!validationResult) {
      setError('');
      if (view === 'login') {
        postWithoutAuth('login', data)
          .then((res) => {
            if (res) {
            
              navigate('/tasks');
            } else {
              setError('Invalid email or password');
            }
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        register(data);
      }
    } else {
      setError(validationResult);
    }
  };

  const register = (data) => {
    postWithoutAuth('register', data).then((res) => {
      if (res) {
        setOpen(true);
        setView('login');
      } else {
        setError('User with the same email already exists');
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Task Management App
      </h1>
      <div className='flex flex-grow items-center justify-center'>
        <div className='w-full max-w-md'>
          <LoginCard
            type={view}
            onButtonClick={validateLoginInput}
            onChangeType={() =>
              setView(view === 'login' ? 'register' : 'login')
            }
            error={error}
          />
        </div>
      </div>
      <SnackbarActivation
        text='Successfully registered'
        variant='success'
        openSnackbar={open}
        handleClose={handleClose}
      />
    </div>
  );
}

export default LoginPage;
