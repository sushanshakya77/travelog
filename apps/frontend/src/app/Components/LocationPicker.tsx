import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { useForm } from 'react-hook-form';
import { Autocomplete, Box } from '@mui/material';
import { useQuery } from 'react-query';
import { IDestination } from '../Pages/Home';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  open: boolean;
  handleClose: () => void;
}

interface IData {
  destination: string;
}

export default function LocationPickerDialog({ open, handleClose }: IProps) {
  const { register, handleSubmit, reset } = useForm<IData>();
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );
  console.log(destinationData);
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Destination</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {destinationData && (
              <Autocomplete
                disablePortal
                options={destinationData.map(
                  (destination) => destination.imgAlt
                )}
                freeSolo
                sx={{ width: 300 }}
                {...register('destination')}
                renderInput={(params) => (
                  <RedditTextField {...params} label="Search" />
                )}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
