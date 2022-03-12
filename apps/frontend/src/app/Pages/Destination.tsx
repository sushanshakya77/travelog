import { Send } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { useAuthentication } from '../useAuthentication/useAuthentication';
import { IDestination } from './Home';
import { IUserInfo } from './UserInfo';

const Destination = () => {
  const { id } = useParams();
  const { user } = useAuthentication();

  console.log(user);

  const { data: destinationData, refetch } = useQuery<IDestination>(
    'specificDestination',
    () => axios.get(`api/destinations/${id}`).then((res) => res.data)
  );
  console.log(destinationData?.reviews);
  const { data: userInfoData } = useQuery<IUserInfo>(
    'userInfo',
    async () => await axios.get('api/userInfo').then((res) => res.data)
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IDestination>({});

  const onSubmit: SubmitHandler<IDestination> = async (data) => {
    await axios
      .patch(`api/destinations/review/${id}`, data)
      .then((res) => {
        console.log(res);
        refetch();
        setValue('reviews', []);
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
            <Typography variant="h4">{destinationData?.imgAlt}</Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Rating
                readOnly
                value={destinationData?.rating}
                precision={0.5}
              />
            </Grid>
            <Typography variant="h6" sx={{ marginTop: '4px' }}>
              Rating: {destinationData?.rating}
            </Typography>
          </Grid>
          <Typography variant="h6">Categories:</Typography>
          {destinationData?.categories?.map((category, index) => (
            <Typography sx={{ marginTop: '4px', display: 'flex' }} key={index}>
              {', '}
              {category}
            </Typography>
          ))}
          <div>
            <Card
              component="img"
              src={destinationData?.img}
              alt={destinationData?.imgAlt}
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
              {destinationData?.imgDesc}
            </Typography>
          </div>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Typography variant="h5">Reviews:</Typography>
          </Grid>
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
              </div>
            </Grid>
            <Grid item xs={12} mt="10px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledTextField
                  Component={RedditTextField}
                  name="reviews"
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
                      >
                        Review
                      </Button>
                    ),
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              {destinationData?.reviews?.map((review, index) => (
                <Grid item xs={12} mt="10px">
                  <Card sx={{ padding: '26px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                      key={index}
                    >
                      <Avatar></Avatar>
                      <Typography variant="h6" sx={{ ml: '8px' }}>
                        {review?.postedBy}:
                      </Typography>
                      <Typography variant="body1" sx={{ ml: '8px' }}>
                        "{review?.reviewText}"
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Destination;
