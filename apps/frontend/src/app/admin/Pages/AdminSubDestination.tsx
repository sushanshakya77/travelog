import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ISubDestination } from '../../models/Destination';
import SubDestinationForm from '../Components/SubDestinationForm';

const AdminSubDestination = () => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<ISubDestination>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(undefined);
    subRefetch();
  };

  const handleEdit = (row: ISubDestination) => {
    handleClickOpen();
    setEdit(row);
  };

  const { data: subDestinationData, refetch: subRefetch } = useQuery<
    ISubDestination[]
  >('subDestinations', () =>
    axios.get('/api/subDestinations').then((res) => res.data)
  );
  const handleDelete = async (id: string) => {
    await axios
      .delete(`/api/subDestinations/delete/${id}`)
      .then((res) => {
        console.log(res);
        subRefetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Toolbar>
        <Typography variant="h6">Manage Destination</Typography>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-plus"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#feffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
          }
          style={{ textTransform: 'none' }}
          onClick={handleClickOpen}
          disableElevation
          disableRipple
        >
          Add Sub-Destination
        </Button>
      </Toolbar>
      {open && (
        <SubDestinationForm
          open={open}
          fromEdit={edit}
          handleClose={handleClose}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Parent</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subDestinationData?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">
                  {row.parentDestination?.title}
                </TableCell>
                <TableCell align="right">{row.longitude}</TableCell>
                <TableCell align="right">{row.latitude}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEdit(row)}>Edit</Button>
                  <Button onClick={() => handleDelete(row._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminSubDestination;
