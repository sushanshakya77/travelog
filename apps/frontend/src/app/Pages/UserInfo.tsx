import styled from '@emotion/styled';
import {
  Add,
  DescriptionOutlined,
  Edit,
  Event,
  Favorite,
  FavoriteBorder,
  LocationOnOutlined,
  MoreVert,
  Settings,
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Tab,
  Tabs,
  Typography,
  Link as TextLink,
  Menu,
  MenuItem,
  Card,
  Divider,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import AddProfile from '../Components/AddProfile';
import EditProfile from '../Components/EditProfile';
import ResetPassword from '../Components/ResetPassword';
import { IBlog } from '../models/Blogs';
import { IPost } from '../models/Post';
import { Status } from '../models/Trips';
import { IUser } from '../models/User';
import { useAuthentication } from '../useAuthentication/useAuthentication';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserInfo = () => {
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = (post: IPost) => {
    try {
      axios.put(`/api/posts/${post._id}/like`).then(() => postRefetch());
    } catch (err) {
      console.log(err);
    }
    setIsLiked(!isLiked);
  };
  const handleDelete = async (id: string) => {
    console.log(id);
    await axios.delete(`/api/posts/delete/${id}`).then(() => postRefetch());
  };
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const { reset } = useForm<IUser>();
  const { user } = useAuthentication();

  const {
    data: userInfoData,
    refetch,
    isLoading,
  } = useQuery<IUser>(
    'userInfo',
    async () => await axios.get('api/userInfo').then((res) => res.data)
  );
  const { data: postsData, refetch: postRefetch } = useQuery<IPost[]>(
    'userposts',
    () => axios.get(`/api/posts/profile/${user._id}`).then((res) => res.data)
  );
  const handleClickOpen = () => {
    setOpen(true);

    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFormClose = () => {
    setForm(false);
  };
  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const { data: blogData, refetch: blogRefetch } = useQuery<IBlog[]>(
    'blogs',
    () => axios.get(`api/blogs`).then((res) => res.data)
  );
  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: 'url(https://wallpaperaccess.com/full/959294.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],

          backgroundSize: 'cover',
          height: '350px',
          backgroundPosition: 'center',
        }}
      />

      <Grid container spacing={2}>
        <Container maxWidth="lg" sx={{ transform: 'translate(0%,-30%)' }}>
          <Grid container item>
            <Box
              maxWidth="lg"
              sx={{
                margin: 'auto',
                width: '100%',
                padding: '25px',
                pb: '0px',
                borderRadius: '8px',
              }}
              elevation={0}
              component={Paper}
            >
              <Grid container>
                <Grid item xs={1.5}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton
                        sx={{
                          width: 33,
                          height: 33,
                          border: `2px solid ${theme.palette.background.paper}`,
                          bgcolor: '#EEEEEE',
                          color: '#222831',
                          '&:hover': {
                            bgcolor: '#EEEEEE',
                          },
                        }}
                        onClick={handleClickOpenProfile}
                        component="span"
                      >
                        <Edit />
                      </IconButton>
                    }
                  >
                    <Avatar
                      src={`http://localhost:3333/${userInfoData?.profilePicture}`}
                      sx={{
                        height: '128px',
                        width: '128px',
                      }}
                    />
                  </Badge>
                </Grid>
                {(userInfoData || openProfile) && (
                  <AddProfile
                    openProfile={openProfile}
                    handleCloseProfile={handleCloseProfile}
                  />
                )}
                <Grid item xs={8.5}>
                  {isLoading ? (
                    <Skeleton animation="wave" width="25px" />
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          lineHeight: '28px',
                        }}
                      >
                        {userInfoData?.firstName} {userInfoData?.lastName}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '14px',
                          lineHeight: '18px',
                        }}
                      >
                        {userInfoData?.username && `@${userInfoData?.username}`}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={1.4}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="outlined"
                      disableRipple
                      sx={{
                        color: 'black',
                      }}
                      onClick={handleClickOpen}
                    >
                      Edit Profile
                    </Button>
                  </ThemeProvider>
                  {userInfoData && (
                    <EditProfile
                      open={open}
                      handleClose={handleClose}
                      userInfo={userInfoData}
                      setOpen={setOpen}
                    />
                  )}
                </Grid>
                <Grid item xs>
                  <IconButton onClick={handleClick}>
                    <Settings />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClickOpen}>Edit Profile</MenuItem>
                    <MenuItem onClick={() => setForm(true)}>
                      Change Password
                    </MenuItem>
                  </Menu>
                </Grid>
                <ResetPassword form={form} handleFormClose={handleFormClose} />
                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        centered
                      >
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Blogs" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
        <Container maxWidth="lg" sx={{ mt: '-40px' }}>
          <Grid container item>
            <Grid item xs={2.5}>
              <Box
                elevation={0}
                component={Paper}
                maxWidth="sm"
                sx={{ padding: '25px', borderRadius: '8px' }}
              >
                <Typography sx={{ fontSize: '20px', lineHeight: '40px' }}>
                  Intro
                </Typography>
                <Typography sx={{ fontSize: '14px', my: '6px' }}>
                  <Event sx={{ fontSize: '16px' }} /> Joined in{'   '}
                  {dayjs(userInfoData?.createdAt).format('MMM DD, YYYY')}
                </Typography>

                {userInfoData?.currentCity ? (
                  <Typography sx={{ fontSize: '14px', my: '6px' }}>
                    <LocationOnOutlined sx={{ fontSize: '16px' }} />{' '}
                    {userInfoData?.currentCity}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: '14px', my: '6px' }}>
                    <TextLink
                      color="#000000"
                      onClick={handleClickOpen}
                      style={{ cursor: 'pointer' }}
                    >
                      <Add sx={{ fontSize: '16px' }} /> Add a Country
                    </TextLink>
                  </Typography>
                )}
                {userInfoData?.description ? (
                  <Typography sx={{ fontSize: '14px', my: '6px' }}>
                    <DescriptionOutlined sx={{ fontSize: '16px' }} />{' '}
                    {userInfoData?.description}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: '14px', my: '6px' }}>
                    <TextLink
                      color="#000000"
                      onClick={handleClickOpen}
                      style={{ cursor: 'pointer' }}
                    >
                      <Add sx={{ fontSize: '16px' }} /> Add a Description
                    </TextLink>
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={9.5}>
              <TabPanel value={value} index={0}>
                {postsData?.map((post) => (
                  // <Grid item xs={12} md={8}>
                  <Card
                    sx={{ width: '100%', borderRadius: '6px', mt: '-24px' }}
                    elevation={0}
                    key={post._id}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          src={`http://localhost:3333/${userInfoData?.profilePicture}`}
                        ></Avatar>
                      }
                      action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                          <MoreVert />
                        </IconButton>
                      }
                      title={`${post.postedBy.firstName}
                    ${post.postedBy.lastName} 
                    was in ${post.destination.title}`}
                      subheader={dayjs(post.createdAt).format(
                        'MMMM DD YYYY, h:mm a'
                      )}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleDelete(post._id)}>
                        Delete Post
                      </MenuItem>
                    </Menu>
                    <CardMedia
                      component="img"
                      height="20"
                      image={`http://localhost:3333/${post.img}`}
                      alt="random"
                      sx={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardContent>
                      {post?.postedBy?.username}: "{post.caption}"
                      <Typography variant="body2" component="div">
                        Liked by: {post.likes.length}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      {isLiked || post.likes.includes(user._id as never) ? (
                        <IconButton aria-label="add to favorites">
                          <Favorite
                            sx={{ color: '#fd4444' }}
                            onClick={() => likeHandler(post)}
                          />
                        </IconButton>
                      ) : (
                        <IconButton aria-label="add to favorites">
                          <FavoriteBorder onClick={() => likeHandler(post)} />
                        </IconButton>
                      )}
                    </CardActions>
                  </Card>
                  // </Grid>
                ))}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Card
                  sx={{
                    padding: '25px',
                    mt: '-20px',
                  }}
                  elevation={0}
                >
                  <Divider sx={{ mb: '15px' }} />
                  {blogData?.map((blog) => (
                    <Link to={`/singleBlog/${blog._id}`}>
                      <Grid
                        container
                        key={blog._id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        <Grid item xs={10}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}
                          >
                            <Typography variant="h6">{blog.title}</Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                ml: '8px',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              by {blog.postedBy.username}
                              {blog.status === Status.Public ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-world"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#2c3e50"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <circle cx="12" cy="12" r="9" />
                                  <line x1="3.6" y1="9" x2="20.4" y2="9" />
                                  <line x1="3.6" y1="15" x2="20.4" y2="15" />
                                  <path d="M11.5 3a17 17 0 0 0 0 18" />
                                  <path d="M12.5 3a17 17 0 0 1 0 18" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-lock"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#fc1313"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <rect
                                    x="5"
                                    y="11"
                                    width="14"
                                    height="10"
                                    rx="2"
                                  />
                                  <circle cx="12" cy="16" r="1" />
                                  <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                                </svg>
                              )}
                            </Typography>
                          </div>
                          <Typography
                            variant="body1"
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {blog.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <div
                            style={{
                              backgroundSize: 'cover',
                              height: '100px',
                              width: '150px',
                              overflow: 'hidden',
                            }}
                          >
                            <img src={blog.img} alt="gg" />
                          </div>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: '15px' }} />
                    </Link>
                  ))}
                </Card>
              </TabPanel>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
