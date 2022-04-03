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
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const images = [
  {
    label: 'desert',
    imgPath:
      'https://images.unsplash.com/photo-1639402479478-f5e7881c0ccc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
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

export default function Banner() {
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
            top: '25%',
            left: '40%',
            zIndex: 99,
          }}
        >
          <Typography
            sx={{
              fontSize: '64px',
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            travelog.
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              color: 'white',
            }}
          >
            "make memories as you go"
          </Typography>
          <TextField
            size="small"
            placeholder="Search something..."
            sx={{
              fontSize: '64px',
              bgcolor: 'white',
              width: '280px',
              borderRadius: '25px',
              border: 'none',
              outline: 'none',
              ml: '-20px',
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
          />
        </div>
        {images.map((status) => (
          <SwiperSlide style={{ height: 480 }}>
            <img src={`${status.imgPath}`} alt={`${status.label}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Typography
        sx={{
          fontSize: '64px',
          position: 'absolute',
          color: 'white',
          bottom: 450,
          right: 650,

          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}
      >
        travelog.
      </Typography>
      <Typography
        sx={{
          zIndex: 999,
          fontSize: '18px',
          position: 'absolute',
          bottom: 430,
          right: 670,
          // margin: 'auto',
          // translate: 'transform(0%,-90%)',
          color: 'white',
        }}
      >
        "make memories as you go"
      </Typography>
      <TextField
        // variant="standard"
        size="small"
        placeholder="Search something..."
        sx={{
          fontSize: '64px',
          position: 'absolute',
          bgcolor: 'white',
          width: '280px',
          // height: '40px',
          bottom: 380,
          right: 640,
          borderRadius: '25px',
          border: 'none',
          outline: 'none',
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
  );
}
