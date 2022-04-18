import {
  Autocomplete,
  ListItemIcon,
  MenuItem,
  Paper,
  Zoom,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import useSWR, { useSWRConfig } from 'swr';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { IDestination } from '../models/Destination';
import { ITrip, Status } from '../models/Trips';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

interface IProps {
  open: boolean;
  handleClose: () => void;
}
const StyledDialog = styled(Dialog)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18); */
`;

export default function TripNameDialog({ open, handleClose }: IProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    register,
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

  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );

  return (
    <div>
      <StyledDialog
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
            margin="dense"
            label="Trips Name"
            rules={{ required: 'name is required' }}
            fullWidth
            control={control}
          />
          <ControlledTextField
            Component={RedditTextField}
            name="desc"
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            control={control}
          />
          <RedditTextField
            select
            margin="dense"
            label="Status"
            fullWidth
            {...register('status')}
          >
            {[Status.Private, Status.Public].map((option, index) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-lock"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#fc1313"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <circle cx="12" cy="16" r="1" />
                      <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-world"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="9" />
                      <line x1="3.6" y1="9" x2="20.4" y2="9" />
                      <line x1="3.6" y1="15" x2="20.4" y2="15" />
                      <path d="M11.5 3a17 17 0 0 0 0 18" />
                      <path d="M12.5 3a17 17 0 0 1 0 18" />
                    </svg>
                  )}
                </ListItemIcon>
                {option}
              </MenuItem>
            ))}
          </RedditTextField>
          {/* {watch('status') === Status.Public && (
            <Controller
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={destinationData ?? []}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <RedditTextField
                      {...params}
                      label="Search"
                      margin="dense"
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
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
