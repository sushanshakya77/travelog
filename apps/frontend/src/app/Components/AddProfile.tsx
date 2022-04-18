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
import { useAuthentication } from '../useAuthentication/useAuthentication';

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
  const input = React.useRef<HTMLInputElement | null>(null);

  const [image, setImage] = React.useState<File>();
  const { user } = useAuthentication();

  const formData = new FormData();
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    if (image) formData.append('profile', image, image.name);
    axios
      .patch(`/api/userInfo/addProfile/${user._id}`, formData)
      .then((res) => {
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
                type="file"
                ref={input}
                id="icon-button-file"
                accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (!fileList) {
                    return;
                  }
                  setImage(fileList[0]);
                }}
                style={{ display: 'none' }}
                name="profile"
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
