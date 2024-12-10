import {
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function CloseableCard({ title, closeCard, children }) {
  return (
      <Card className='mb-4'>
        <CardActions className='flex justify-between items-center'>
          <h2 className='text-xl mb-4'>{title}</h2>
          <IconButton
            onClick={closeCard}
            className='text-gray-600 focus:outline-none'
          >
            <CloseIcon />
          </IconButton>
        </CardActions>
        <CardContent>{children}</CardContent>
      </Card>
  );
}

export default CloseableCard;
