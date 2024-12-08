import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import './LoginCard.css';

function LoginCard({ type, onButtonClick, onChangeType, error }) {
  const [loginData, setLoginData] = useState({});
  const title = type === 'login' ? 'Login' : 'Register';
  const toOtherTypeText = title === 'Login' ? 'Register' : 'Login';

  const changeLoginField = (field, e) => {
    setLoginData({ ...loginData, [field]: e.target.value });
  };

  return (
    <div className='login-card-wrapper'>
      <Card className='login-card'>
        <CardContent>
          <Typography variant='h6' component='div' className='text-center'>
            {title}
          </Typography>
          <TextField
            sx={{ marginTop: '10px', width: '100%' }}
            label='Email'
            onChange={(e) => changeLoginField('email', e)}
          />
          {title === 'Register' && (
            <TextField
              sx={{ marginTop: '10px', width: '100%' }}
              label='Full Name'
              onChange={(e) => changeLoginField('name', e)}
            />
          )}
          <TextField
            sx={{ marginTop: '10px', width: '100%' }}
            label='Password'
            onChange={(e) => changeLoginField('password', e)}
          />
          {error && <div className='login-error'>{error}</div>}
        </CardContent>
        <div className='login-card-button-wrapper'>
          <Button
            sx={{ backgroundColor: 'grey', color: 'white' }}
            className='btn btn-primary'
            onClick={() => onButtonClick(loginData)}
          >
            {title}
          </Button>
        </div>
        <div className='login-change-type-text' onClick={onChangeType}>
          go to {toOtherTypeText}
        </div>
      </Card>
    </div>
  );
}

export default LoginCard;
