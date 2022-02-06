import { Card, Container, Grid, Rating, Typography } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { IDestination } from './Home';

const Destination = () => {
  const { id } = useParams();
  const { data: destinationData } = useQuery<IDestination>(
    'specificDestination',
    () => axios.get(`api/destinations/${id}`).then((res) => res.data)
  );
  console.log(destinationData);

  return (
    <div>
      <Container sx={{ display: 'flex', padding: '40px' }} maxWidth="lg">
        <Grid>
          <Typography variant="h4">{destinationData?.imgAlt}</Typography>
          <Rating readOnly value={destinationData?.rating} precision={0.5} />

          <Typography variant="h6" sx={{ marginTop: '4px' }}>
            Rating: {destinationData?.rating}
          </Typography>
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
                height: '500px',
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
      </Container>
    </div>
  );
};

export default Destination;
