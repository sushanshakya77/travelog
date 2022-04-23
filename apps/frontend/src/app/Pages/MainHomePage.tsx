import React from 'react';
import styled from '@emotion/styled';
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';
import { IBlog } from '../models/Blogs';
import { IDestination, ISubDestination } from '../models/Destination';
import { HoverCard } from './Home';
import { useAuthentication } from '../useAuthentication/useAuthentication';
const MainHomePage = () => {
  const { user } = useAuthentication();
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );
  const { data: subDestinationData } = useQuery<ISubDestination[]>(
    'subDestinations',
    () => axios.get('api/subDestinations').then((res) => res.data)
  );
  const { data: allBlogData } = useQuery<IBlog[]>('allblogs', () =>
    axios.get(`api/blogs/all`).then((res) => res.data)
  );

  const average = (arr: number[]) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
  };

  return (
    <div>
      <Grid container>
        <Grid container>
          <Grid container alignItems="center">
            <Grid item xs={12} sx={{ mt: '20px' }}>
              <Typography sx={{ fontSize: '30px' }}>
                Popular Destinations
              </Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: '20px' }}>
              <Typography variant="body2" sx={{ fontSize: '15px' }}>
                Explore the best destinations in Nepal
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container spacing={2}>
            {destinationData?.slice(0, 3).map((content: IDestination) => (
              <Grid item xs={12} sm={6} md={4}>
                <Link
                  to={`destinations/${content._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <HoverCard
                    sx={{ maxWidth: 345, mt: '15px' }}
                    key={content.img}
                    elevation={0}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={content.img}
                        alt={content.title}
                        sx={{
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: '250px',
                          width: '500px',
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {content.title}
                        </Typography>
                        <Rating
                          value={
                            content &&
                            average(
                              content.reviews.map(
                                (review) => review.reviewRating as number
                              )
                            )
                          }
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ height: '50px' }}
                        >
                          {content.description.substring(0, 100)}...
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </HoverCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            backgroundColor: '#52327c',
            height: '482px',
            width: '1136px',
            mt: '50px',
            // borderRadius: '10px',
          }}
        >
          <Grid item xs={5} sx={{ padding: '25px' }}>
            <div
              style={{
                height: '450px',
                // width: '460px',
              }}
            >
              <img
                src="https://i.pinimg.com/564x/00/0b/ba/000bbad272eb46a28d2136c6c4589d45.jpg"
                alt="img"
                style={{
                  height: '430px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div>
              <Typography
                variant="h4"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '30px',
                  textAlign: 'center',
                  mt: '20px',
                }}
              >
                Explore Nepal
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: '#fff',
                  fontSize: '15px',
                  textAlign: 'center',
                  mt: '20px',
                }}
              >
                See how other people are exploring Nepal.
              </Typography>
              <Link to="explore">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '50px',
                    background: '#ffffff',
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: '#fadada',
                      color: '#000',
                    },
                    ml: '60px',
                    mt: '10px',
                  }}
                  disableElevation
                  disableRipple
                >
                  Take me there.
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: '30px' }} spacing={1}>
          <Grid container alignItems="center">
            <Grid item xs={12} sx={{ mt: '20px' }}>
              <Typography sx={{ fontSize: '30px' }}>Blogs:</Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: '20px' }}>
              <Typography variant="body2" sx={{ fontSize: '15px' }}>
                Discover more of what matters to you.
              </Typography>
            </Grid>
          </Grid>
          {allBlogData?.slice(0, 3).map((content: IBlog) => (
            <Grid item xs={12} sm={8} md={4} key={content._id}>
              <Link to={`/singleBlog/${content._id}`}>
                <HoverCard
                  sx={{ mt: '15px', position: 'relative' }}
                  elevation={0}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      alt="gg"
                      image={content.img}
                      // image={content.image}
                      sx={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(50%)',
                        height: '250px',
                        width: '500px',
                        top: 0,
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
                      src={`http://localhost:3333/${content.postedBy.profilePicture}`}
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
                      {content.title}
                    </Typography>
                  </CardActionArea>
                </HoverCard>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid container sx={{ mt: '30px' }} spacing={1}>
          <Grid container alignItems="center">
            <Grid item xs={12} sx={{ mt: '20px' }}>
              <Typography sx={{ fontSize: '30px' }}>More Places:</Typography>
            </Grid>
            <Grid xs={12} sx={{ mb: '20px' }}>
              <Typography variant="body2" sx={{ fontSize: '15px' }}>
                Discover more places.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {subDestinationData?.slice(0, 3).map((content: IDestination) => (
              <Grid item xs={12} sm={6} md={4}>
                <Link
                  to={`subDestinations/${content._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <HoverCard
                    sx={{ maxWidth: 345, mt: '15px' }}
                    key={content.img}
                    elevation={0}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={content.img}
                        alt={content.title}
                        sx={{
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: '250px',
                          width: '500px',
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {content.title}
                        </Typography>
                        <Rating
                          value={content.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {content.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </HoverCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainHomePage;
