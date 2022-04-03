import {
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
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ControlledTextField from '../../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../../ControlledComponent/RedditTextField';
import { IDestination } from '../../models/Destination';

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
  fromEdit: IDestination | undefined;
}

const DestinationForm = (props: IProps) => {
  const { open, handleClose, fromEdit } = props;

  const { handleSubmit, control, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: fromEdit?.title ?? '',
      img: fromEdit?.img ?? '',
      description: fromEdit?.description ?? '',
      longitude: fromEdit?.longitude ?? 0,
      latitude: fromEdit?.latitude ?? 0,
      categories: fromEdit?.categories ?? '',
    },
  });

  const onSubmit: SubmitHandler<IDestination> = async (data) => {
    console.log(data);
    if (fromEdit) {
      axios
        .patch(`api/destinations/update/${fromEdit._id}`, data)
        .then((res) => {
          console.log(res);
          handleClose();
        });
    } else
      return await axios
        .post('api/destinations', data)
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

export default DestinationForm;
