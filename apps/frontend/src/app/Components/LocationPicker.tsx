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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Box, Paper } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IDestination } from '../models/Destination';

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
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

interface IData {
  destination: IDestination;
}

export default function LocationPickerDialog({
  open,
  handleClose,
  setDestination,
}: IProps) {
  const { register, handleSubmit, control, watch, setValue } = useForm<IData>();
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );
  const onSubmit: SubmitHandler<IData> = (data) => {
    setDestination(data.destination._id);
    handleClose();
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
        <DialogTitle>Add Destination</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {destinationData && (
              <Controller
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={destinationData}
                    getOptionLabel={(option) => option.title}
                    freeSolo
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <RedditTextField
                        {...params}
                        label="Search"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'disabled',
                        }}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                )}
                control={control}
                name="destination"
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
