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
import { IDestination, ISubDestination } from '../models/Destination';
import { ITrip, Status } from '../models/Trips';
import { useAuthentication } from '../useAuthentication/useAuthentication';
import { IBlog } from '../models/Blogs';

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
  fromTrip?: string;
  setDestination?: React.Dispatch<React.SetStateAction<string>>;
  setTripForBlog?: React.Dispatch<React.SetStateAction<string>>;
}

interface IData {
  destination: IDestination;
  trip: ITrip;
}

export default function LocationPickerDialog({
  open,
  handleClose,
  setDestination,
  setTripForBlog,
  fromTrip,
}: IProps) {
  const { register, handleSubmit, control, watch, setValue } = useForm<IData>();
  const { user } = useAuthentication();
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/subDestinations').then((res) => res.data)
  );
  const { data: tripData, refetch: tripRefetch } = useQuery<ITrip[]>(
    'trips',
    async () =>
      await axios.get(`api/trip/user/${user._id}`).then((res) => res.data)
  );

  const onSubmit: SubmitHandler<IData> = (data) => {
    setDestination?.(data.destination._id);
    setTripForBlog?.(data.trip._id);
    if (fromTrip) {
      axios.patch(`/api/blogs/update/${fromTrip}`, {
        trip: data.trip._id,
      });
    }
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
        <DialogTitle>Add {fromTrip ? 'Trip' : 'Destination'} </DialogTitle>
        <DialogContent>
          {fromTrip ? (
            <div>
              <Controller
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={
                      tripData?.filter(
                        (trip) => trip.status === Status.Public
                      ) ?? []
                    }
                    getOptionLabel={(option) => option.title}
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
                name="trip"
              />
            </div>
          ) : (
            <div>
              <Controller
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={destinationData ?? []}
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
                    onChange={(_, data) => {
                      if (data) field.onChange(data);
                    }}
                  />
                )}
                control={control}
                name="destination"
              />
            </div>
          )}
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
