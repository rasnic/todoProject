import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
function SnacbarActivation({ openSnackbar, handleClose, variant, text }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(openSnackbar);
  }, [openSnackbar]);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={variant}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
export default SnacbarActivation;
