import { Card, Container, Grid, Rating, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { IDestination } from './Home';

const Destination = () => {
  const { id } = useParams();
  const { data: destinationData } = useQuery<IDestination>(
    'specificDestination',
    () => axios.get(`api/destinations/${id}`).then((res) => res.data)
  );
  console.log(destinationData?.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container sx={{ display: 'flex', padding: '40px' }} maxWidth="lg">
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
          {destinationData?.categories.map((category, index) => (
            <Typography sx={{ marginTop: '4px', display: 'flex' }} key={index}>
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
      </Container>
    </div>
  );
};

export default Destination;
