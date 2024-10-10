import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

const UserForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', zipcode: '' });

  const handleAdd = () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: { city: form.city, zipcode: form.zipcode },
    };
    dispatch(addUser(newUser));
    setForm({ name: '', email: '', phone: '', city: '', zipcode: '' });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle >Add New User</DialogTitle>
      <DialogContent >
        <Grid container spacing={3} sx={{paddingTop: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              fullWidth
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              fullWidth
              value={form.zipcode}
              onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
