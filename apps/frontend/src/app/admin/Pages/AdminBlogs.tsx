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
import { IBlog } from '../../models/Blogs';
import BlogForm from '../Components/BlogForm';

const AdminBlogs = () => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<IBlog>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(undefined);
    blogRefetch();
  };

  const handleEdit = (row: IBlog) => {
    handleClickOpen();
    setEdit(row);
  };

  const handleDelete = async (id: string) => {
    await axios
      .delete(`/api/blogs/${id}`)
      .then((res) => {
        console.log(res);
        blogRefetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data: allBlogData, refetch: blogRefetch } = useQuery<IBlog[]>(
    'allblogs',
    () => axios.get(`api/blogs/all`).then((res) => res.data)
  );
  return (
    <div>
      <Toolbar>
        <Typography variant="h6">Manage Blogs</Typography>
        <div style={{ flexGrow: 1 }} />
      </Toolbar>
      {open && (
        <BlogForm open={open} fromEdit={edit} handleClose={handleClose} />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Categories</TableCell>
              <TableCell align="right">Posted By</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBlogData?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.categories}</TableCell>
                <TableCell align="right">{row.postedBy.username}</TableCell>
                <TableCell align="center">
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

export default AdminBlogs;
