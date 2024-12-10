import { useState } from 'react';
import { Button } from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

function DropdownComponent({ title, defaultOpen, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mb-4'>
      <Button
        onClick={toggleDropdown}
        endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        fullWidth
      >
        {title}
      </Button>
      {isOpen && <div className='mt-4'>{children}</div>}
    </div>
  );
}

export default DropdownComponent;
