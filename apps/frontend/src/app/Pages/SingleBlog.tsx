import { ExpandMore, MoreVert } from '@mui/icons-material';
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
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { IBlog } from '../models/Blogs';
import dayjs from 'dayjs';
import LocationPickerDialog from '../Components/LocationPicker';
import { useAuthentication } from '../useAuthentication/useAuthentication';

const SingleBlog = () => {
  const { id } = useParams();
  const { user } = useAuthentication();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [tripForBlog, setTripForBlog] = useState<string>('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(tripForBlog);

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
    () => axios.get(`api/blogs/${id}`).then((res) => res.data)
  );
  console.log(blogData);
  const { data: blogUserData, refetch: blogUserRefetch } = useQuery<IBlog[]>(
    'userblogs',
    () =>
      axios
        .get(`api/blogs/user/${blogData?.postedBy?._id}`)
        .then((res) => res.data)
  );

  React.useEffect(() => {
    blogUserRefetch();
  }, []);

  const fromTrip = blogData?._id;
  return (
    <Container sx={{ ml: '150px' }}>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{
            padding: '30px',
            borderRight: '1px solid #bdbdbd',
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
              backgroundImage: 'url(https://source.unsplash.com/random)',
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
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: '25px',
                }}
                elevation={0}
              >
                <Divider sx={{ mb: '15px' }} />
                {blogUserData?.map((blog) => (
                  <Grid container key={blog._id}>
                    <Grid item xs={8}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Typography variant="h6">{blog.title}</Typography>
                        <Typography variant="body2" sx={{ ml: '8px' }}>
                          by {blog.postedBy.username}
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
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eos animi soluta tenetur rem natus, hic,
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
                        <img
                          src="https://source.unsplash.com/random"
                          alt="gg"
                        />
                      </div>
                    </Grid>
                  </Grid>
                ))}
                <Divider sx={{ my: '15px' }} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>{' '}
      <Grid container sx={{ px: '40px', ml: '20px' }} spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ lineHeight: '80px', fontWeight: '500' }}
          >
            Featured Blogs:
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleBlog;
