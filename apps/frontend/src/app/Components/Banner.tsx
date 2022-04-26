import React from 'react';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autocomplete,
  Box,
  InputAdornment,
  Rating,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { ISubDestination } from '../models/Destination';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const images = [
  {
    label: 'himal',
    imgPath:
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    label: 'village',
    imgPath:
      'https://images.unsplash.com/photo-1511215579272-6192432f83bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    label: 'desert',
    imgPath:
      'https://images.unsplash.com/photo-1639402479478-f5e7881c0ccc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  },
  {
    label: 'anotherForest',
    imgPath:
      'https://images.unsplash.com/photo-1438786657495-640937046d18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    label: 'jungle',
    imgPath:
      'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    label: 'stars',
    imgPath:
      'https://images.unsplash.com/photo-1641752084801-80dc709cdf28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80',
  },

  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1619947583507-a407bed90513?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    label: 'green',
    imgPath:
      'https://images.unsplash.com/photo-1641555130479-473595f33bd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
  },
  {
    label: 'forest',
    imgPath:
      'https://images.unsplash.com/photo-1634728627693-bc388bd2b3d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80',
  },
  {
    label: 'f&f',
    imgPath:
      'https://images.unsplash.com/photo-1639402476132-77c147aa2078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
  },
  {
    label: 'random',
    imgPath:
      'https://images.unsplash.com/photo-1506606401543-2e73709cebb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];
interface IProps {
  destinations: ISubDestination;
}

interface IBannerProps {
  setSearchDestination: React.Dispatch<React.SetStateAction<string>>;
}

export default function Banner({ setSearchDestination }: IBannerProps) {
  const { control } = useForm<IProps>();
  const { data: subDestinationData } = useQuery<ISubDestination[]>(
    'subDestinations',
    () => axios.get('api/subDestinations').then((res) => res.data)
  );
  return (
    <div>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        className="mySwiper"
        style={{ position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 450,
            zIndex: 99,
          }}
        >
          <Typography
            sx={{
              fontSize: '74px',
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            travelog.
          </Typography>
          <Typography
            sx={{
              fontSize: '22px',
              color: 'white',
            }}
          >
            "make memories as you go"
          </Typography>
          {subDestinationData && (
            <Controller
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={subDestinationData ?? []}
                  getOptionLabel={(option) => option.title}
                  // freeSolo
                  size="small"
                  popupIcon={false}
                  noOptionsText="No results"
                  renderOption={(props, option) => (
                    <Link to={`subDestinations/${option._id}`}>
                      <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="60"
                          src={option.img}
                          alt={option.title}
                        />
                        {option.title}
                        <Rating
                          value={option.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </Box>
                    </Link>
                  )}
                  sx={{
                    bgcolor: 'white',
                    outline: 'none',
                    mt: '10px',
                    ml: '-15px',
                    width: '300px',
                    borderRadius: '25px',
                    zIndex: 999,
                    '& .MuiOutlinedInput-root:hover': {
                      '& > fieldset': {
                        border: 'none',
                      },
                    },
                    '.MuiOutlinedInput-root': {
                      border: 'none',
                    },
                    '&:hover': {
                      bgcolor: 'white',
                    },
                    '&: MuiFilledInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '25px',
                      border: '1px solid #e0e0e0',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'disabled',
                      }}
                    />
                  )}
                  onChange={(_, data) => {
                    if (data) setSearchDestination(data._id);
                  }}
                />
              )}
              control={control}
              name="destinations"
            />
          )}

          {/* <TextField
            size="small"
            placeholder="Search something..."
            sx={{
              fontSize: '64px',
              bgcolor: 'white',
              width: '300px',
              borderRadius: '25px',
              border: 'none',
              outline: 'none',
              ml: '-10px',
              mt: '10px',
              zIndex: 999,
              '& .MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  border: 'none',
                },
              },
              '.MuiOutlinedInput-root': {
                border: 'none',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),

              // disableUnderline: true,
            }}
          /> */}
        </div>
        {images.map((status) => (
          <SwiperSlide style={{ height: 500 }}>
            <img src={`${status.imgPath}`} alt={`${status.label}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
