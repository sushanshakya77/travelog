import styled from '@emotion/styled';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
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
import { IUser } from '../models/User';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  openProfile: boolean;
  handleCloseProfile: () => void;
  userInfo: IUser;
}

export default function AddProfile({
  openProfile,
  handleCloseProfile,
  userInfo,
}: IProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    axios.post(`/api/userInfo`, data).then((res) => {
      console.log(res);
      handleCloseProfile();
    });
  };
  return (
    <div>
      <Dialog
        PaperComponent={(props) => (
          <Paper {...(props as never)} component={'form'}></Paper>
        )}
        open={openProfile}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseProfile}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Choose your profile picture</DialogTitle>
        <DialogContent>
          <Button
            sx={{
              height: '250px',
              width: '100%',
              // backgroundColor: '#393E46',
              // color: '#EEEEEE',
              borderRadius: '10px',
              // border: '1px solid #222831',
              // '&:hover': { backgroundColor: '#222831', color: '#EEEEEE' },
              borderColor: 'divider',
            }}
            disableElevation
            disableRipple
            variant="contained"
          >
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: 'none' }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <AddCircleOutlineOutlined />
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    my: '100px',
                    textTransform: 'none',
                    ml: '5px',
                    lineHeight: '1.2',
                  }}
                >
                  Add Photo
                </Typography>
              </div>
            </label>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile}>Cancel</Button>
          <Button type="submit">Set as Profile Picture</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
