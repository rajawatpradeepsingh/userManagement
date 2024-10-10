import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, editUser } from '../redux/userSlice';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Paper, Container, Typography, Grid } from '@mui/material';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);

  const [editRow, setEditRow] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', city: '', zipcode: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditRow(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
      zipcode: user.address.zipcode,
    });
  };

  const handleSave = (id) => {
    const updatedUser = {
      ...users.find(user => user.id === id),
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      address: { city: editForm.city, zipcode: editForm.zipcode },
    };
    dispatch(editUser({ id, updatedUser }));
    setEditRow(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          User List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City with Zip Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <TextField
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <TextField
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <TextField
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  ) : (
                    user.phone
                  )}
                </TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          label="City"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Zip Code"
                          value={editForm.zipcode}
                          onChange={(e) => setEditForm({ ...editForm, zipcode: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    `${user.address.city}, ${user.address.zipcode}`
                  )}
                </TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <Button onClick={() => handleSave(user.id)} variant="contained" color="primary" size="small">
                      Save
                    </Button>
                  ) : (
                    <Button onClick={() => handleEdit(user)} variant="outlined" color="primary" size="small">
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default UserTable;
