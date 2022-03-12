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
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';

export interface IDestination {
  _id: string;
  img: string;
  imgAlt: string;
  rating: number;
  imgDesc: string;
  categories: string[];
  reviews: IReview[];
}

interface IReview {
  _id: string;
  postedBy: any;
  reviewText: string;
}

const StyledCard = styled(Card)`
  transition: 0.3s ease-in-out;
  &:hover {
    transform: translateY(-2%);
  }
`;
const blogs = [
  {
    img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
    imgTitle: 'Boudha',
    imgAlt: 'Boudha',
    rating: 3.5,
    imgDesc:
      'Boudhanath also called Boudha is a stupa in Kathmandu, Nepal. Boudha stupa is semicircle shaped and contains the relics and remains of Buddha. The stupa’s massive mandala makes it one of the largest spherical stupas in the world. Boudha Stupa was listed in world heritage list by UNESCO in 1979 and it is one of the most popular tourist sites in Kathmandu. The stupa dates from 600AD and was built by a Tibetan king. The stupa is a historical pilgrimage site for all the Buddhists around the world. The stupa was built using many kilograms of gold for decoration. The stupa is located in the middle of the city of Boudha. The stupa is a popular tourist attraction in Kathmandu and is one of the most popular places to visit in Nepal. ',
    categories: ['Religious Sites'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1586100345684-a135906ef03c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imgTitle: 'Bhaktapur Durbar Square',
    imgAlt: 'Bhaktapur Durbar Square',
    rating: 4,
    imgDesc:
      'Bhaktapur Durbar Square, locally known as Khwopa Lyaku (Nepal Bhasa: Devanagari : ख्वप लायकू) is the royal palace of the old Bhaktapur Kingdom, 1,400 metres (4,600 ft) above sea level. It is a UNESCO World Heritage Site. Reasonably, it is grounded within the area of 6.52 square miles yet it has numerous temples and wow monuments.The Bhaktapur Durbar Square is located in the current town of Bhaktapur, also known as Khwopa, which lies 13 km east of Kathmandu. While the complex consists of at least four distinct squares (Durbar Square, Taumadhi Square, Dattatreya Square and Pottery Square), the whole area is informally known as the Bhaktapur Durbar Square and is a highly visited site in the Kathmandu Valley',
    categories: ['Ancient Ruins', 'Points of Interest', 'Religious Sites'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1611605645802-c21be743c321?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imgTitle: 'Dingboche',
    imgAlt: 'Dingboche',
    rating: 4,
    imgDesc:
      "Dingboche is a popular stop for trekkers and climbers headed to Mount Everest, Ama Dablam or Imja Tse. Parties will typically spend two nights in Dingboche for acclimatization purposes.The village relies heavily on tourists with lodges and tenting areas comprising most of Dingboche. The Imja River flows directly east of the village.A helicopter landing pad is located just west of the Imja River, near Moonlight Lodge. Dingboche is home to an Internet cafe (using satellite technology) and one of the world's highest billiard parlors.One of the characteristics of Dingboche is the kilometers of stone walls, built using the stones of different sizes that cover the entire Valley of Imja. These stones are removed in order to plow the soil and end up being piled one over the other creating kilometers of walls.",
    categories: ['Mountains'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1579516170686-6299bcede3dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    imgTitle: 'Swayambhunath',
    imgAlt: 'Swayambhunath',
    rating: 5,
    imgDesc:
      "Swayambhu (Devanagari: स्वयम्भू स्तूप; Newar: स्वयंभू; sometimes Swayambu or Swoyambhu) is an ancient religious complex atop a hill in the Kathmandu Valley, west of Kathmandu city. The Tibetan name for the site means 'Sublime Trees' (Wylie: Phags.pa Shing.kun), for the many varieties of trees found on the hill. However, Shing.kun may be of the local Nepal Bhasa name for the complex, Swayambhu, meaning 'self-sprung'.[1] For the Buddhist Newars, in whose mythological history and origin myth as well as day-to-day religious practice Swayambhunath occupies a central position, it is probably the most sacred among Buddhist pilgrimage sites. For Tibetans and followers of Tibetan Buddhism, it is second only to Boudha.",
    categories: ['Religious Sites'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1598877077661-ca2bf7e99bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    imgTitle: 'Fewa Tal',
    imgAlt: 'Fewa Tal',
    rating: 5,
    imgDesc:
      "Phewa Lake, Phewa Tal or Fewa Lake (Nepali: फेवा ताल, [ˈpʰewa tal]) is a freshwater lake in Nepal formerly called Baidam Tal located in the south of the Pokhara Valley that includes Pokhara city; parts of Sarangkot and Kaskikot. The lake is stream-fed but a dam regulates the water reserves, therefore, the lake is classified as semi-natural freshwater lake.It is the second largest lake in Nepal; the largest in Gandaki Province after the Rara lake in the comparison to Nepal's water bodies. It is the most popular and most visited lake of Nepal. Phewa lake is located at an altitude of 742 m (2,434 ft) and covers an area of about 4.43 km2 (1.7 sq mi). It has an average depth of about 8.6 m (28 ft) and a maximum depth of 24 m (79 ft). Maximum water capacity of the lake is approximately 43,000,000 cubic metres (35,000 acre⋅ft). The Annapurna range on the north is only about 28 km (linear distance) away from the lake. The lake is also famous for the reflection of mount Machhapuchhre and other mountain peaks of the Annapurna and Dhaulagiri ranges on its surface. The Tal Barahi Temple is situated on an island in the lake. It is located 4 km from the city's centre Chipledhunga.",
    categories: ['Bodies of Water'],
    comments: [],
  },
  {
    img: 'https://images.unsplash.com/photo-1623148186670-27885b95e3f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imgTitle: 'Thamel',
    imgAlt: 'Thamel',
    rating: 4.5,
    imgDesc:
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
        <Grid container spacing={2}>
          {destinationData?.map((content: IDestination) => (
            <Grid item xs={12} sm={6} md={4}>
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
                        {content.imgDesc}
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
