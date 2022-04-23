import { ExpandMore, MoreVert, Send } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  Typography,
  Divider,
  Card,
  Toolbar,
  MenuItem,
  Menu,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Rating,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IBlog } from '../models/Blogs';
import dayjs from 'dayjs';
import LocationPickerDialog from '../Components/LocationPicker';
import { useAuthentication } from '../useAuthentication/useAuthentication';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HoverCard } from './Home';
import { IconContainer } from './Destination';
import { IReview } from '../models/Destination';
import { useSnackbar } from 'notistack';

const SingleBlog = () => {
  const { id } = useParams();
  const { user } = useAuthentication();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [tripForBlog, setTripForBlog] = useState<string>('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { data: blogData, refetch: blogRefetch } = useQuery<IBlog>(
    'blogsid',
    () => axios.get(`api/blogs/${id}`).then((res) => res.data),
    {
      refetchInterval: 1000,
    }
  );
  console.log(blogData);
  const { data: blogUserData, refetch: blogUserRefetch } = useQuery<IBlog[]>(
    'userblogs',
    () =>
      axios
        .get(`/api/blogs/user/${blogData?.postedBy?._id}`)
        .then((res) => res.data),
    {
      refetchInterval: 100,
    }
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IReview>({});

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IReview> = async (data) => {
    await axios
      .patch(`/api/blogs/review/${id}`, data)
      .then((res) => {
        console.log(res);
        blogRefetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    axios
      .delete(`/api/blogs/${id}`)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Succesfully Deleted!', {
          variant: 'success',
          autoHideDuration: 3000,
        });
        navigate('/user/info');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fromTrip = blogData?._id;

  return (
    <div style={{ margin: '0px 20px 0px 20px' }}>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{
            padding: '30px',
            borderRight: '1px solid #bdbdbd',
            borderLeft: '1px solid #bdbdbd',
            overflow: 'auto',
            maxHeight: '800px',
          }}
        >
          <Grid item xs={12} sx={{ display: 'flex', alignContent: 'center' }}>
            <Grid container item xs={11}>
              <Grid item xs={1}>
                <Avatar sx={{ width: 46, height: 46 }} />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body1">
                  {blogData?.postedBy?.username}
                </Typography>
                <Typography variant="body2">
                  {dayjs(blogData?.createdAt).format('MMM DD, YYYY')}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={1}>
              {user?._id === blogData?.postedBy?._id && (
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              )}

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClickOpen}>Add Trip</MenuItem>
                <MenuItem onClick={handleDelete}>Delete Blog</MenuItem>
              </Menu>
              <LocationPickerDialog
                open={open}
                handleClose={handleClose}
                setTripForBlog={setTripForBlog}
                fromTrip={fromTrip}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: '20px' }}>
            <Typography variant="h4" sx={{ fontWeight: '700' }}>
              {blogData?.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              mt: '20px',
              backgroundImage: `url(${blogData?.img})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],

              backgroundSize: 'cover',
              height: '450px',
              backgroundPosition: 'center',
            }}
          ></Grid>
          <Grid item xs={12} sx={{ mt: '20px' }}>
            <Typography variant="body1">{blogData?.description}</Typography>
          </Grid>
          {blogData?.trip && (
            <Grid item xs={12}>
              <Typography variant="h6">Days of trips</Typography>
              {blogData?.trip?.days?.map((day, index) => (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>
                      Day {index + 1}: {day.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{day.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12} sx={{ padding: '30px' }}>
            <Grid item xs={12}>
              <Avatar sx={{ width: 78, height: 78, mx: 'auto' }} />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4">
                  {blogData?.postedBy?.firstName}
                  {'  '}
                  {blogData?.postedBy?.lastName}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1">
                  @{blogData?.postedBy.username}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1">
                  "{blogData?.postedBy?.description}"
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sx={{ my: '10px' }}>
              <Typography variant="h6">
                More from {blogData?.postedBy.username}:
              </Typography>
            </Grid>
            {!blogUserData ? (
              <CircularProgress />
            ) : (
              <Grid item xs={12}>
                <Card
                  sx={{
                    padding: '25px',
                  }}
                  elevation={0}
                >
                  <Divider sx={{ mb: '15px' }} />
                  {blogUserData
                    ?.filter((blog) => blog._id !== blogData?._id)
                    .map((blog) =>
                      blog ? (
                        <Link to={`/singleBlog/${blog._id}`}>
                          <Grid container key={blog._id}>
                            <Grid item xs={8}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <Typography variant="h6">
                                  {blog.title}
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
                            <Grid item xs={4}>
                              <div
                                style={{
                                  backgroundSize: 'cover',
                                  height: '100px',
                                  width: '100px',
                                  overflow: 'hidden',
                                }}
                              >
                                <img src={blog.img} alt="gg" />
                              </div>
                            </Grid>
                          </Grid>
                          <Divider sx={{ my: '15px' }} />
                        </Link>
                      ) : (
                        <div>No Blogs from user</div>
                      )
                    )}
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>{' '}
      <Grid container sx={{ px: '40px' }} spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ lineHeight: '80px', fontWeight: '500' }}
          >
            Reviews:
          </Typography>
          <Rating
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
            onChange={(_, value) => {
              setValue('reviewRating', value);
            }}
          />
        </Grid>
        <Grid item xs={12} mt="10px">
          <ControlledTextField
            Component={RedditTextField}
            name="reviewText"
            label="Write Your Review Here:"
            multiline
            fullWidth
            rows={4}
            control={control}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<Send sx={{ fontSize: '6px' }} />}
                  disableRipple
                  disableElevation
                  sx={{ textTransform: 'none' }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Review
                </Button>
              ),
            }}
          />
        </Grid>
        {blogData?.reviews?.map((review, index) => (
          <Grid item xs={12} mt="10px" md={4}>
            <HoverCard
              sx={{ padding: '26px', position: 'relative' }}
              elevation={0}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
                key={review._id}
              >
                <Avatar></Avatar>
                <IconButton
                  sx={{ float: 'right', position: 'absolute', right: 16 }}
                >
                  <MoreVert />
                </IconButton>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6">
                  {review?.postedBy?.username}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Rating
                  value={review?.reviewRating}
                  IconContainerComponent={IconContainer}
                  highlightSelectedOnly
                  readOnly
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1">"{review?.reviewText}"</Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <TextField
                  size="small"
                  margin="dense"
                  placeholder="Reply to this comment"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleSubmit(onSubmit)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-brand-telegram"
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
                          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                        </svg>
                      </IconButton>
                    ),
                  }}
                />
              </div>
            </HoverCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SingleBlog;
