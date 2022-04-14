import { Add } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fab,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Categories, IBlog } from '../models/Blogs';

const BlogsMainPage = () => {
  const { data: blogData, refetch: blogRefetch } = useQuery<IBlog[]>(
    'blogs',
    () => axios.get(`api/blogs`).then((res) => res.data)
  );
  const { data: allBlogData } = useQuery<IBlog[]>('allblogs', () =>
    axios.get(`api/blogs/all`).then((res) => res.data)
  );
  return (
    <div>
      <Grid container sx={{ px: '40px', ml: '20px' }} spacing={2}>
        <Grid item xs={12}>
          <Toolbar>
            <Typography
              variant="h4"
              sx={{ lineHeight: '80px', fontWeight: '500' }}
            >
              Featured Blogs:
            </Typography>
            <div style={{ flexGrow: 1 }} />
            {/* <Link to="addBlog">
          <Button
            sx={{ textTransform: 'none', color: '#2c3e50' }}
          >
            Add Your Blog
          </Button>{' '}
        </Link> */}
          </Toolbar>
        </Grid>
        {allBlogData?.map(
          (blog) =>
            blog.categories === Categories.Featured && (
              <Grid item xs={12} sm={6} md={6} key={blog._id}>
                <Link to={`/singleBlog/${blog._id}`}>
                  <Card sx={{ mt: '15px' }} elevation={0}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://www.awwwards.com/awards/images/2019/05/illustration-web-design-2-cover.jpg"
                      alt="gg"
                      sx={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(90%)',
                        height: '300px',
                        transition: '0.3s ease-in-out',
                        top: 0,
                        '&:hover': {
                          filter: 'brightness(100%)',
                        },
                      }}
                    />
                    <CardContent sx={{ backgroundColor: '#DEF2F1' }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                          zIndex: 9,
                          // bottom: 24,
                          // left: 24,
                          // position: 'absolute',
                          color: 'black',
                          textAlign: 'center',
                        }}
                        component="div"
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        by {blog.postedBy.username}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
        )}
        {/* {allBlogData?.map(
      (blog) => blog.categories === Categories.Popular && <div>hi</div>
    )} */}

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ mt: '15px' }} elevation={0}>
            <CardMedia
              component="img"
              height="140"
              image="https://miro.medium.com/max/1400/1*SeoJ8tDtFHdpoU1xxjI1UQ.jpeg"
              alt="gg"
              sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(90%)',
                height: '300px',
                transition: '0.3s ease-in-out',
                top: 0,
                '&:hover': {
                  filter: 'brightness(100%)',
                },
              }}
            />
            <CardContent sx={{ backgroundColor: '#DEF2F1' }}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  zIndex: 9,
                  // bottom: 24,
                  // left: 24,
                  // position: 'absolute',
                  color: 'black',
                  textAlign: 'center',
                }}
                component="div"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
                ipsum odit nihil. Odio, similique.
              </Typography>
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                by hernandez
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ px: '40px', ml: '20px' }} spacing={2}>
        <Grid item xs={12}>
          <Toolbar>
            <Typography
              variant="h4"
              sx={{ lineHeight: '80px', fontWeight: '500' }}
            >
              Popular Blogs:
            </Typography>
          </Toolbar>
        </Grid>

        <Grid item xs={6}>
          <Card
            sx={{
              padding: '25px',
            }}
            elevation={0}
          >
            <Divider sx={{ mb: '15px' }} />
            <Grid container>
              <Grid item xs={10}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="h6">Blog title</Typography>
                  <Typography variant="body2" sx={{ ml: '8px' }}>
                    by prisma{' '}
                  </Typography>
                </div>
                <Typography variant="body1">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
                  animi soluta tenetur rem natus, hic, reiciendis eligendi quos
                  aliquam facere cumque voluptate nostrum excepturi qui, quidem
                  dolor delectus at harum.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    backgroundSize: 'cover',
                    height: '100px',
                    width: '100px',
                    overflow: 'hidden',
                  }}
                >
                  <img src="https://source.unsplash.com/random" alt="gg" />
                </div>
              </Grid>
            </Grid>
            <Divider sx={{ my: '15px' }} />
            <Grid container>
              <Grid item xs={10}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="h6">Blog title</Typography>
                  <Typography variant="body2" sx={{ ml: '8px' }}>
                    by prisma{' '}
                  </Typography>
                </div>
                <Typography variant="body1">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
                  animi soluta tenetur rem natus, hic, reiciendis eligendi quos
                  aliquam facere cumque voluptate nostrum excepturi qui, quidem
                  dolor delectus at harum.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    backgroundSize: 'cover',
                    height: '100px',
                    width: '100px',
                    overflow: 'hidden',
                  }}
                >
                  <img src="https://source.unsplash.com/random" alt="gg" />
                </div>
              </Grid>
            </Grid>
            <Divider sx={{ mt: '15px' }} />
          </Card>
        </Grid>
        <Grid
          item
          xs={6}
          // sx={{
          //   display: 'flex',
          //   flexWrap: 'wrap',
          //   justifyContent: 'space-between',
          // }}
        >
          <Card
            elevation={0}
            sx={{
              padding: '20px',
              mt: '48px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ lineHeight: '80px', fontWeight: '500' }}
            >
              Discover more of what matters to you.
            </Typography>
            {[
              'Art',
              'Design',
              'Tech',
              'Trekking',
              'Hiking',
              'Dance',
              'Lift',
              'Bike',
              'Climb',
              'Camping',
              'Adventure',
              'Nature',
              'Food',
              'Travel',
              'Photography',
              'Music',
            ].map((item) => (
              <Link to={`tags/${item}`}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '0px',
                    textTransform: 'none',
                    border: '1px solid #fee9e9',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontWeight: '400',
                    '&:hover': {
                      border: '1px solid #fee9e9',
                      backgroundColor: '#fff',
                      color: '#000',
                    },
                    m: '5px',
                  }}
                  disableElevation
                  disableRipple
                  key={item}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </Card>
        </Grid>
      </Grid>
      {blogData && (
        <Grid container sx={{ px: '40px', ml: '20px' }}>
          <Grid item xs={12}>
            <Toolbar>
              <Typography
                variant="h4"
                sx={{ lineHeight: '80px', fontWeight: '500' }}
              >
                Your Blogs:
              </Typography>
            </Toolbar>
          </Grid>
          {blogData?.slice(0, 4).map((blog) => (
            <Grid item xs={12} sm={6} md={3}>
              <Link to={`/singleBlog/${blog._id}`}>
                <Card
                  sx={{ mt: '15px', maxWidth: '300px' }}
                  elevation={0}
                  key={blog._id}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="gg"
                    sx={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(90%)',
                      height: '300px',
                      transition: '0.3s ease-in-out',
                      top: 0,
                      '&:hover': {
                        filter: 'brightness(100%)',
                      },
                    }}
                  />
                  <CardContent sx={{ backgroundColor: '#DEF2F1' }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        zIndex: 9,
                        color: 'black',
                        textAlign: 'center',
                      }}
                      component="div"
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      by {blog.postedBy.username}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <Link to="addBlog">
        <Fab
          color="primary"
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            textTransform: 'none',
            backgroundColor: '#4A9E68',
            '&:hover': {
              backgroundColor: '#297845',
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-edit"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#f6f6f6"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
          Add Blog
        </Fab>
      </Link>
    </div>
  );
};

export default BlogsMainPage;