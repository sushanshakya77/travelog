import styled from '@emotion/styled';
import {
  Avatar,
  Button,
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
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';
import { IBlog } from '../models/Blogs';
import { IDestination, ISubDestination } from '../models/Destination';

export const HoverCard = styled(Card)`
  transition: 0.3s ease-in-out;
  &:hover {
    transform: translateY(-2%);
  }
`;

const blogs = [
  {
    img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
    imgTitle: 'Boudha',
    title: 'Boudha',
    rating: 3.5,
    description:
      'Boudhanath also called Boudha is a stupa in Kathmandu, Nepal. Boudha stupa is semicircle shaped and contains the relics and remains of Buddha. The stupa’s massive mandala makes it one of the largest spherical stupas in the world. Boudha Stupa was listed in world heritage list by UNESCO in 1979 and it is one of the most popular tourist sites in Kathmandu. The stupa dates from 600AD and was built by a Tibetan king. The stupa is a historical pilgrimage site for all the Buddhists around the world. The stupa was built using many kilograms of gold for decoration. The stupa is located in the middle of the city of Boudha. The stupa is a popular tourist attraction in Kathmandu and is one of the most popular places to visit in Nepal. ',
    categories: ['Religious Sites'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1586100345684-a135906ef03c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imgTitle: 'Bhaktapur Durbar Square',
    title: 'Bhaktapur Durbar Square',
    rating: 4,
    description:
      'Bhaktapur Durbar Square, locally known as Khwopa Lyaku (Nepal Bhasa: Devanagari : ख्वप लायकू) is the royal palace of the old Bhaktapur Kingdom, 1,400 metres (4,600 ft) above sea level. It is a UNESCO World Heritage Site. Reasonably, it is grounded within the area of 6.52 square miles yet it has numerous temples and wow monuments.The Bhaktapur Durbar Square is located in the current town of Bhaktapur, also known as Khwopa, which lies 13 km east of Kathmandu. While the complex consists of at least four distinct squares (Durbar Square, Taumadhi Square, Dattatreya Square and Pottery Square), the whole area is informally known as the Bhaktapur Durbar Square and is a highly visited site in the Kathmandu Valley',
    categories: ['Ancient Ruins', 'Points of Interest', 'Religious Sites'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1611605645802-c21be743c321?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imgTitle: 'Dingboche',
    title: 'Dingboche',
    rating: 4,
    description:
      "Dingboche is a popular stop for trekkers and climbers headed to Mount Everest, Ama Dablam or Imja Tse. Parties will typically spend two nights in Dingboche for acclimatization purposes.The village relies heavily on tourists with lodges and tenting areas comprising most of Dingboche. The Imja River flows directly east of the village.A helicopter landing pad is located just west of the Imja River, near Moonlight Lodge. Dingboche is home to an Internet cafe (using satellite technology) and one of the world's highest billiard parlors.One of the characteristics of Dingboche is the kilometers of stone walls, built using the stones of different sizes that cover the entire Valley of Imja. These stones are removed in order to plow the soil and end up being piled one over the other creating kilometers of walls.",
    categories: ['Mountains'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1579516170686-6299bcede3dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    imgTitle: 'Swayambhunath',
    title: 'Swayambhunath',
    rating: 5,
    description:
      "Swayambhu (Devanagari: स्वयम्भू स्तूप; Newar: स्वयंभू; sometimes Swayambu or Swoyambhu) is an ancient religious complex atop a hill in the Kathmandu Valley, west of Kathmandu city. The Tibetan name for the site means 'Sublime Trees' (Wylie: Phags.pa Shing.kun), for the many varieties of trees found on the hill. However, Shing.kun may be of the local Nepal Bhasa name for the complex, Swayambhu, meaning 'self-sprung'.[1] For the Buddhist Newars, in whose mythological history and origin myth as well as day-to-day religious practice Swayambhunath occupies a central position, it is probably the most sacred among Buddhist pilgrimage sites. For Tibetans and followers of Tibetan Buddhism, it is second only to Boudha.",
    categories: ['Religious Sites'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1598877077661-ca2bf7e99bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    imgTitle: 'Fewa Tal',
    title: 'Fewa Tal',
    rating: 5,
    description:
      "Phewa Lake, Phewa Tal or Fewa Lake (Nepali: फेवा ताल, [ˈpʰewa tal]) is a freshwater lake in Nepal formerly called Baidam Tal located in the south of the Pokhara Valley that includes Pokhara city; parts of Sarangkot and Kaskikot. The lake is stream-fed but a dam regulates the water reserves, therefore, the lake is classified as semi-natural freshwater lake.It is the second largest lake in Nepal; the largest in Gandaki Province after the Rara lake in the comparison to Nepal's water bodies. It is the most popular and most visited lake of Nepal. Phewa lake is located at an altitude of 742 m (2,434 ft) and covers an area of about 4.43 km2 (1.7 sq mi). It has an average depth of about 8.6 m (28 ft) and a maximum depth of 24 m (79 ft). Maximum water capacity of the lake is approximately 43,000,000 cubic metres (35,000 acre⋅ft). The Annapurna range on the north is only about 28 km (linear distance) away from the lake. The lake is also famous for the reflection of mount Machhapuchhre and other mountain peaks of the Annapurna and Dhaulagiri ranges on its surface. The Tal Barahi Temple is situated on an island in the lake. It is located 4 km from the city's centre Chipledhunga.",
    categories: ['Bodies of Water'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1623148186670-27885b95e3f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imgTitle: 'Thamel',
    title: 'Thamel',
    rating: 4.5,
    description:
      'Thamel (Nepali: ठमेल) is a commercial neighborhood located in Kathmandu, the capital of Nepal. Thamel has been the centre of the tourist industry in Kathmandu for over four decades, starting from the hippie days when many artists came to Nepal and spent weeks in Thamel. It is the hottest-spot for tourism inside the Kathmandu valley.Thamel is known by its narrow alleys crowded with various shops and vendors. Commonly sold goods include food, fresh vegetables/fruits, pastries, trekking gear, walking gear, music, DVDs, handicrafts, souvenirs, woolen items and clothes. Travel agencies, small grocery stores, budget hotels, restaurants, pubs and clubs also line the streets. Cars, cycle rickshaws, two-wheelers and taxis ply these narrow streets alongside hundreds of pedestrians.',
    categories: ['Neighbourhoods'],
    comments: [],
  },
];

const Home = () => {
  console.log(blogs);
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

  return (
    <div>
      <Container maxWidth="lg">
        <Banner />
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
                          value={content.rating}
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
                      image="https://source.unsplash.com/random"
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
      </Container>
    </div>
  );
};

export default Home;
