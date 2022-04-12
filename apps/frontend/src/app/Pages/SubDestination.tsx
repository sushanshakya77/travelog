import {
  MoreVert,
  Send,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  IconButton,
  IconContainerProps,
  Rating,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Replies from '../Components/Replies';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { IReview, ISubDestination } from '../models/Destination';
import { ITrip } from '../models/Trips';
import { IUser } from '../models/User';
import { useAuthentication } from '../useAuthentication/useAuthentication';
import { HoverCard } from './Home';

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfied />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfied />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfied />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAlt />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfied />,
    label: 'Very Satisfied',
  },
};
export function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const SubDestination = () => {
  const { id } = useParams();
  const { user } = useAuthentication();
  const [open, setOpen] = React.useState(false);
  const [reviews, setreviews] = React.useState<IReview>();

  const handleClickOpen = (data: IReview) => {
    setOpen(true);
    setreviews(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(user);
  const { data: subDestinationData, refetch: subDestinationRefetch } =
    useQuery<ISubDestination>('specificsubDestination', () =>
      axios.get(`api/subDestinations/${id}`).then((res) => res.data)
    );
  const { data: tripData, refetch: tripRefetch } = useQuery<ITrip[]>(
    'trips',
    () => axios.get(`api/trip/destination/${id}`).then((res) => res.data)
  );
  console.log(tripData);
  const { data: userInfoData } = useQuery<IUser>(
    'userInfo',
    async () => await axios.get('api/userInfo').then((res) => res.data)
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm<IReview>({});

  const onSubmit: SubmitHandler<IReview> = async (data) => {
    console.log(data);
    await axios
      .patch(`api/subDestinations/review/${id}`, data)
      .then((res) => {
        console.log(res);
        subDestinationRefetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <Container sx={{ padding: '40px' }} maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">{subDestinationData?.title}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Rating
                readOnly
                value={subDestinationData?.rating}
                precision={0.5}
              />
            </Grid>
            <Typography variant="h6" sx={{ marginTop: '4px' }}>
              Rating: {subDestinationData?.rating}
            </Typography>
          </Grid>
          <Typography variant="h6">Categories:</Typography>
          {/* {subDestinationData?.categories?.map((category, index) => (
              <Typography sx={{ marginTop: '4px', display: 'flex' }} key={index}>
                {', '}
                {category}
              </Typography>
            ))} */}
          <div>
            <Card
              component="img"
              src={subDestinationData?.img}
              alt={subDestinationData?.title}
              sx={{
                marginLeft: '25px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                float: 'right',
                height: '450px',
              }}
            />
            <Typography
              variant="body1"
              sx={{ marginTop: '20px', textAlign: 'justify' }}
            >
              {subDestinationData?.description}
            </Typography>
          </div>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">
              Blogs related to the subDestination:
            </Typography>
          </Grid>
          {tripData?.map((trip, index) => (
            <Grid item xs={12} sm={8} md={4}>
              <HoverCard
                sx={{ mt: '15px', position: 'relative' }}
                elevation={0}
                key={trip._id}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="gg"
                    sx={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(50%)',
                      height: '250px',
                      width: '500px',
                      transition: '0.3s ease-in-out',
                      top: 0,
                      '&:hover': {
                        filter: 'brightness(80%)',
                      },
                    }}
                  />
                  <Avatar
                    sx={{
                      zIndex: 9,
                      top: 24,
                      right: 24,
                      position: 'absolute',
                      boxShadow: '-2px 1px 40px 1px rgba(0,0,0,0.76)',
                      WebkitBoxShadow: '-2px 1px 40px 1px rgba(0,0,0,0.76)',
                      MozBoxShadow: '-2px 1px 40px 1px rgba(0,0,0,0.76)',
                    }}
                  ></Avatar>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{
                      zIndex: 9,
                      bottom: 24,
                      left: 24,
                      position: 'absolute',
                      color: 'white',
                    }}
                    component="div"
                  >
                    {trip.title}
                  </Typography>
                </CardActionArea>
              </HoverCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} mt="24px">
          <Grid item xs={3}>
            <Typography variant="h5">Your Reviews here:</Typography>
          </Grid>
          <Grid item container xs={9} spacing={1}>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Avatar></Avatar>
                <Typography variant="h6" sx={{ ml: '8px' }}>
                  {userInfoData?.username}
                </Typography>

                <Rating
                  IconContainerComponent={IconContainer}
                  highlightSelectedOnly
                  onChange={(_, value) => {
                    setValue('reviewRating', value);
                  }}
                />
              </div>
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
            {subDestinationData?.reviews?.map((review, index) => (
              <Grid item xs={12} mt="10px" md={4}>
                <HoverCard
                  sx={{ padding: '26px', position: 'relative' }}
                  elevation={0}
                  onClick={() => handleClickOpen(review)}
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
                      {review?.postedBy.username}
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
                    <Typography variant="body1">
                      "{review?.reviewText}"
                    </Typography>
                  </div>
                  {/* <div
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
                        {...register('replyText')}
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                              </svg>
                            </IconButton>
                          ),
                        }}
                      />
                    </div> */}
                </HoverCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Replies reviews={reviews} open={open} handleClose={handleClose} />
      </Container>
    </div>
  );
};

export default SubDestination;
