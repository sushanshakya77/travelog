import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  Avatar,
  Backdrop,
  Card,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { IReply, IReview } from '../models/Destination';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

interface IRepliesProps {
  reviews?: IReview;
  handleClose: () => void;
  open: boolean;
}

const StyledPaper = styled(Paper)`
  background: rgba(255, 255, 255, 0.856);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 10px;
  border-bottom: 1px solid rgba(153, 149, 149, 0.18);
`;

export default function Replies({ reviews, handleClose, open }: IRepliesProps) {
  console.log(reviews);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm<IReply>({});
  const { id } = useParams();

  const onSubmit: SubmitHandler<IReply> = async (data) => {
    console.log(data);
    await axios
      .patch(`api/destinations/review/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperComponent={(props) => (
          <StyledPaper {...(props as never)}></StyledPaper>
        )}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ background: 'transparent' }}
      >
        <DialogTitle>Replies</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Avatar
                  src={`http://localhost:3333/${reviews?.postedBy?.profilePicture}`}
                ></Avatar>
                <Typography variant="h6" sx={{ ml: '20px' }}>
                  {' '}
                  "{reviews?.reviewText}"
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ ml: '40px', my: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Avatar
                src={`http://localhost:3333/${reviews?.postedBy?.profilePicture}`}
              ></Avatar>
              <Typography variant="body1" sx={{ ml: '20px' }}>
                {' '}
                "Yes, I agree with your review"
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              margin="dense"
              fullWidth
              placeholder="Reply to this comment"
              {...register('replyText')}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSubmit(onSubmit)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-brand-telegram"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                    </svg>
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
