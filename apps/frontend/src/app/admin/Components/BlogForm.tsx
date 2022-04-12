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
import { IBlog } from '../../models/Blogs';
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
  fromEdit: IBlog | undefined;
}

const DestinationForm = (props: IProps) => {
  const { open, handleClose, fromEdit } = props;

  const { handleSubmit, control, watch, setValue } = useForm({
    mode: 'onChange',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('categories', event.target.value);
  };

  const onSubmit: SubmitHandler<IBlog> = async (data) => {
    console.log(data);
    if (fromEdit) {
      axios.patch(`/api/blogs/update/${fromEdit._id}`, data).then((res) => {
        console.log(res);
        handleClose();
      });
    }
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
          {fromEdit ? 'Edit' : 'Add'} Blogs
        </DialogTitle>
        <DialogContent>
          <RedditTextField
            select
            fullWidth
            sx={{ width: '500px' }}
            name="categories"
            label="Categories"
            onChange={handleChange}
            {...baseInputProps}
          >
            {['Featured', 'Popular'].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </RedditTextField>
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
