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
import { useQuery } from 'react-query';
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
}

export default function AddProfile({
  openProfile,
  handleCloseProfile,
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

  const [image, setImage] = React.useState<File>();
  const { user } = useAuthentication();
  const { refetch } = useQuery<IUser>('userInfo');
  const formData = new FormData();
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log(image);
    if (image) formData.append('profilePicture', image, image.name);
    axios
      .patch(`/api/userInfo/addProfile/${user._id}`, formData)
      .then((res) => {
        console.log(res);
        handleCloseProfile();
        refetch();
      });
  };
  console.log(watch('profilePicture'));
  return (
    <div>
      <Dialog open={openProfile} TransitionComponent={Transition}>
        <DialogTitle>Choose your profile picture</DialogTitle>
        <DialogContent>
          <Button
            sx={{
              height: '250px',
              width: '100%',
              borderRadius: '10px',
              borderColor: 'divider',
            }}
            disableElevation
            disableRipple
            variant="contained"
          >
            <label htmlFor="icon">
              <input
                type="file"
                id="icon"
                name="profilePicture"
                accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (!fileList) {
                    return;
                  }
                  setImage(fileList[0]);
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {image ? (
                  <div>added</div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </label>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>
            Set as Profile Picture
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
