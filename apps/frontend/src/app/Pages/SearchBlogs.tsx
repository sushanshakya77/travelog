import { Card, Divider, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IBlog } from '../models/Blogs';

const SearchBlogs = () => {
  const { tags } = useParams();
  const { data: tagsBlogData } = useQuery<IBlog[]>('tagsblogs', () =>
    axios.get(`api/blogs/tags/${tags}`).then((res) => res.data)
  );

  return (
    <Grid container sx={{ padding: '40px' }}>
      <Grid item xs={12}>
        <Typography variant="h5">{tags}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            padding: '25px',
          }}
          elevation={0}
        >
          <Divider sx={{ mb: '15px' }} />
          {(tagsBlogData?.length ?? []) < 0 && (
            <Typography>No result on that tag.</Typography>
          )}
          {tagsBlogData?.map((blog) => (
            <Link to={`/singleBlog/${blog._id}`}>
              <Grid container>
                <Grid item xs={10}>
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
                  <Typography variant="body1">
                    {blog.description.substring(0, 450)}...
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
            </Link>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default SearchBlogs;
