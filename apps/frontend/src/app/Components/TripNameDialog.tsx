import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import useSWR, { useSWRConfig } from 'swr';
import { useQuery } from 'react-query';

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

export interface ITrip {
  title: string;
  createdAt: Date;
  desc: string;
  _id: string;
  destinations: [];
}

export default function TripNameDialog({ open, handleClose }: IProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ITrip>({});
  const { refetch } = useQuery<ITrip[]>('trips');
  const onSubmit: SubmitHandler<ITrip> = async (data) => {
    await axios.post('/api/trip', data).then((res) => {
      console.log(res);
      refetch();
      handleClose();
    });
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperComponent={(props) => (
          <Paper {...(props as never)} component={'form'}></Paper>
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Trip's Name</DialogTitle>
        <DialogContent>
          <ControlledTextField
            Component={RedditTextField}
            name="title"
            label="Trips Name"
            rules={{ required: 'name is required' }}
            fullWidth
            control={control}
            sx={{ mt: '6px' }}
          />
          <ControlledTextField
            Component={RedditTextField}
            name="desc"
            label="Description"
            fullWidth
            multiline
            rows={4}
            control={control}
            sx={{ mt: '6px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
