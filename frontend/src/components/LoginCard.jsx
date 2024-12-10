import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import { useState } from 'react';

function LoginCard({ type, onButtonClick, onChangeType, error }) {
  const [loginData, setLoginData] = useState({});
  const title = type === 'login' ? 'Login' : 'Register';
  const toOtherTypeText = type === 'login' ? 'Register' : 'Login';

  const changeLoginField = (field, e) => {
    setLoginData({ ...loginData, [field]: e.target.value });
  };

  return (
    <Card className='w-full max-w-md p-6 shadow-lg bg-white'>
      <CardContent>
        <Typography
          variant='h5'
          component='div'
          sx={{ textAlign: 'center', marginBottom: '24px' }}
        >
          {title}
        </Typography>
        <TextField
          sx={{ marginBottom: '16px', width: '100%' }}
          label='Email'
          variant='outlined'
          onChange={(e) => changeLoginField('email', e)}
        />
        {title === 'Register' && (
          <TextField
            sx={{ marginBottom: '16px', width: '100%' }}
            label='Full Name'
            variant='outlined'
            onChange={(e) => changeLoginField('name', e)}
          />
        )}
        <TextField
          sx={{ marginBottom: '16px', width: '100%' }}
          label='Password'
          type='password'
          variant='outlined'
          onChange={(e) => changeLoginField('password', e)}
        />
        {error && <div className='text-red-500 mt-2'>{error}</div>}
      </CardContent>
      <div className='flex justify-center mt-4'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => onButtonClick(loginData)}
        >
          {title}
        </Button>
      </div>
      <div
        className='text-center text-blue-500 mt-4 cursor-pointer'
        onClick={onChangeType}
      >
        {toOtherTypeText}
      </div>
    </Card>
  );
}

export default LoginCard;
