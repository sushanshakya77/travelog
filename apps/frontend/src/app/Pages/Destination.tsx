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
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Replies from '../Components/Replies';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { IBlog } from '../models/Blogs';
import { IDestination, IReply, IReview } from '../models/Destination';
import { ITrip } from '../models/Trips';
import { IUser } from '../models/User';
import { useAuthentication } from '../useAuthentication/useAuthentication';
import { HoverCard } from './Home';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

const Destination = () => {
  const { id } = useParams();
  const { user } = useAuthentication();
  const [open, setOpen] = React.useState(false);
  const [reviews, setreviews] = React.useState<IReview>();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm<IReview>({});
  const handleClickOpen = (data: IReview) => {
    setOpen(true);
    setreviews(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(user);
  const { data: destinationData, refetch: destinationRefetch } =
    useQuery<IDestination>(
      'specificDestination',
      () => axios.get(`api/destinations/${id}`).then((res) => res.data),
      {
        refetchInterval: 1000,
      }
    );
  const { data: blogData } = useQuery<IBlog[]>('blogsDestination', () =>
    axios.get(`api/blogs/destination/${id}`).then((res) => res.data)
  );
  console.log(blogData);
  // console.log(destinationData?.reviews.postedBy.username);
  const { data: userInfoData } = useQuery<IUser>(
    'userInfo',
    async () => await axios.get('api/userInfo').then((res) => res.data)
  );

  const onSubmit: SubmitHandler<IReview> = async (data) => {
    console.log(data);
    await axios
      .patch(`api/destinations/review/${id}`, data)
      .then((res) => {
        console.log(res);
        destinationRefetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //average from [3,4,5]
  const average = useCallback(
    (arr: number[]) => {
      const sum = arr.reduce((a, b) => a + b, 0);
      return sum / arr.length;
    },
    [destinationData]
  );

  return (
    <div>
      <Container sx={{ padding: '40px' }} maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">{destinationData?.title}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Rating
                readOnly
                value={
                  destinationData &&
                  average(
                    destinationData.reviews.map((r) => r.reviewRating as number)
                  )
                }
                precision={0.5}
              />
            </Grid>
            <Typography variant="h6" sx={{ marginTop: '4px' }}>
              Rating:{' '}
              {destinationData &&
                average(
                  destinationData.reviews.map((r) => r.reviewRating as number)
                )}
            </Typography>
          </Grid>
          <Typography variant="h6">Categories:</Typography>
          <Typography sx={{ marginTop: '4px', display: 'flex' }}>
            {' '}
            {destinationData?.categories}
          </Typography>

          <div>
            <Card
              component="img"
              src={destinationData?.img}
              alt={destinationData?.title}
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
              {destinationData?.description}
            </Typography>
          </div>
        </Grid>
        {blogData === [] && (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">
                Blogs related to the destination:
              </Typography>
            </Grid>
            {blogData?.map((blog, index) => (
              <Grid item xs={12} sm={8} md={4}>
                <Link to={`/singleBlog/${blog._id}`}>
                  <HoverCard
                    sx={{ mt: '15px', position: 'relative' }}
                    elevation={0}
                    key={blog._id}
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
                        src={`http://localhost:3333/${blog.postedBy.profilePicture}`}
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
                        {blog.title}
                      </Typography>
                    </CardActionArea>
                  </HoverCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

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
                <Avatar
                  src={`http://localhost:3333/${user.profilePicture}`}
                ></Avatar>
                <Typography variant="h6" sx={{ ml: '8px' }}>
                  {user?.username}
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
            {/* <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={false}
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            > */}
            {destinationData?.reviews?.map((review, index) => (
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
                    <Avatar
                      src={`http://localhost:3333/${review.postedBy.profilePicture}`}
                    ></Avatar>
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
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
            {/* </Carousel> */}
          </Grid>
        </Grid>
        <Replies reviews={reviews} open={open} handleClose={handleClose} />
      </Container>
    </div>
  );
};

export default Destination;
