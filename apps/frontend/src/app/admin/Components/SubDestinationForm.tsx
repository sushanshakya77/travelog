import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  ListItem,
  MenuItem,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import React, { useMemo } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useQuery } from 'react-query';
import ControlledTextField from '../../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../../ControlledComponent/RedditTextField';
import { IDestination, ISubDestination } from '../../models/Destination';
import { useAuthentication } from '../../useAuthentication/useAuthentication';

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
  fromEdit: ISubDestination | undefined;
}

const SubDestinationForm = (props: IProps) => {
  const { open, handleClose, fromEdit } = props;
  const [destinations, setDestinations] = React.useState<string>();
  const { token } = useAuthentication();

  const { handleSubmit, control, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: fromEdit?.title ?? '',
      img: fromEdit?.img ?? '',
      description: fromEdit?.description ?? '',
      longitude: fromEdit?.longitude ?? 0,
      latitude: fromEdit?.latitude ?? 0,
      parentDestination: fromEdit?.parentDestination ?? '',
      categories: fromEdit?.categories ?? '',
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('parentDestination', event.target.value);
    console.log(event.target.value);
  };
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinationss',
    () => axios.get('api/destinations').then((res) => res.data)
  );

  const onSubmit: SubmitHandler<ISubDestination> = async (data) => {
    console.log(data);
    if (fromEdit) {
      axios
        .patch(`api/subDestinations/update/${fromEdit._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      return await axios
        .post('api/subDestinations', data)
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const baseInputProps = useMemo<Record<string, unknown>>(
    () => ({
      size: 'small',
      fullWidth: true,
      control,
      margin: 'dense',
    }),
    []
  );

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {fromEdit ? 'Edit' : 'Add'} Destination
        </DialogTitle>
        <DialogContent>
          <ControlledTextField
            Component={RedditTextField}
            {...baseInputProps}
            name="title"
            label="Title"
          />
          <ControlledTextField
            Component={RedditTextField}
            {...baseInputProps}
            name="img"
            label="Image(Link)"
          />
          <ControlledTextField
            Component={RedditTextField}
            {...baseInputProps}
            multiline
            rows={4}
            name="description"
            label="Description"
          />
          <TextField
            select
            value={destinations}
            onChange={handleChange}
            label="Parent Destination"
            name="parentDestination"
            {...baseInputProps}
          >
            {destinationData?.map((destination) => (
              <MenuItem key={destination._id} value={destination._id}>
                {destination.title}
              </MenuItem>
            ))}
          </TextField>

          <ControlledTextField
            Component={RedditTextField}
            name="categories"
            label="Categories"
            {...baseInputProps}
          ></ControlledTextField>

          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={6}>
              <ControlledTextField
                Component={RedditTextField}
                {...baseInputProps}
                name="longitude"
                label="longitude"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                Component={RedditTextField}
                {...baseInputProps}
                name="latitude"
                label="latitude"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            {fromEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubDestinationForm;
