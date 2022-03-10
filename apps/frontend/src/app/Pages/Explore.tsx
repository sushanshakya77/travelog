import {
  Add,
  CameraAltOutlined,
  ChatOutlined,
  Favorite,
  LocationOnOutlined,
  MoreVert,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { blue, red, yellow } from '@mui/material/colors';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import LocationPickerDialog from '../Components/LocationPicker';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { IUserInfo } from './UserInfo';

interface IPost {
  userId: Array<string>;
  caption: string;
  img: string;
  likes: number;
  destination: Array<string>;
}

const Explore = () => {
  const { data: userInfoData } = useQuery<IUserInfo>('userInfo', () =>
    axios.get('api/userInfo').then((res) => res.data)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm<IPost>({});

  const onSubmit: SubmitHandler<IPost> = async (data) => {
    await axios.post('api/post', data).then((res) => console.log(res));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid container item spacing={1}>
            <Grid item xs={8}>
              <Card
                sx={{ width: '100%', py: '24px' }}
                elevation={0}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Toolbar>
                  <Avatar sx={{ bgcolor: red[500], ml: '-10px', mr: '10px' }}>
                    S
                  </Avatar>
                  <div style={{ flexGrow: '1' }} />
                  <ControlledTextField
                    Component={RedditTextField}
                    label="Write something about the picture"
                    size="small"
                    fullWidth
                    control={control}
                    name="caption"
                    multiline
                    rows={2}
                  />
                  <IconButton disableRipple>
                    <label htmlFor="icon-button-file">
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        style={{ display: 'none' }}
                        {...register('img')}
                      />
                      <Avatar
                        sx={{ bgcolor: blue[800], width: 36, height: 36 }}
                      >
                        <CameraAltOutlined sx={{ fontSize: '20px' }} />
                      </Avatar>
                    </label>
                  </IconButton>
                  <IconButton
                    disableRipple
                    sx={{ padding: '2px' }}
                    onClick={handleClickOpen}
                  >
                    <Avatar
                      sx={{
                        bgcolor: yellow[900],
                        width: 36,
                        height: 36,
                      }}
                    >
                      <LocationOnOutlined sx={{ fontSize: '20px' }} />
                    </Avatar>
                  </IconButton>
                  <div style={{ flexGrow: '1' }} />
                  <Button disableRipple type="submit">
                    <Add /> Post
                  </Button>
                </Toolbar>
              </Card>
            </Grid>
            <LocationPickerDialog open={open} handleClose={handleClose} />
            <Grid item xs={4}>
              <Card sx={{ width: '100%', height: '150px' }} elevation={0}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: red[500] }}>S</Avatar>}
                  title={userInfoData?.username}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Top Destination of the Day:
                  </Typography>

                  <Typography variant="body1" component="div">
                    benevolent
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ width: '100%', borderRadius: '6px' }} elevation={0}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>S</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={
                  userInfoData?.firstName +
                  ' ' +
                  userInfoData?.lastName +
                  ' was in '
                }
                subheader={dayjs().format('MMMM DD YYYY, h:mm:ss a')}
              />
              <CardMedia
                component="img"
                height="20"
                image="https://source.unsplash.com/random"
                alt="random"
                sx={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <CardContent>
                {userInfoData?.username}
                <Typography variant="body2">pray</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <ChatOutlined />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ width: '100%', borderRadius: '6px' }} elevation={0}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>S</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={
                  userInfoData?.firstName +
                  ' ' +
                  userInfoData?.lastName +
                  ' was in '
                }
                subheader={dayjs().format('MMMM DD YYYY, h:mm:ss a')}
              />
              <CardMedia
                component="img"
                height="20"
                image="https://source.unsplash.com/random"
                alt="random"
                sx={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <CardContent>
                {userInfoData?.username}
                <Typography variant="body2">pray</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <ChatOutlined />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Explore;
