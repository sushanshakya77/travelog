import styled from '@emotion/styled';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';

export interface IDestination {
  _id: string;
  img: string;
  imgAlt: string;
  rating: number;
  description: string;
}

const StyledCard = styled(Card)`
  transition: 0.3s ease-in-out;
  &:hover {
    transform: translateY(-2%);
  }
`;

const Home = () => {
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );
  return (
    <div>
      <Container maxWidth="lg">
        <Banner />
        <Grid container alignItems="center">
          <Typography
            sx={{ fontSize: '30px', lineHeight: '100px', margin: 'auto' }}
          >
            POPULAR DESTINATIONS
          </Typography>
        </Grid>
        <Divider variant="middle" />
        <Grid container spacing={1.5}>
          {destinationData?.map((content: IDestination) => (
            <Grid item xs sx={{ ml: '15px' }}>
              <Link
                to={`destinations/${content._id}`}
                style={{ textDecoration: 'none' }}
              >
                <StyledCard
                  sx={{ maxWidth: 345, mt: '15px' }}
                  key={content.img}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={content.img}
                      alt={content.imgAlt}
                      sx={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '250px',
                        width: '500px',
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {content.imgAlt}
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
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
