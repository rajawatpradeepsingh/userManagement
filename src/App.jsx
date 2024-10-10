import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import { Container, Button, Grid } from '@mui/material';

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>User Management</h1>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            style={{ marginBottom: '20px' }}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <UserForm open={open} handleClose={handleClose} />
      <UserTable />
    </Container>
  );
};

export default App;
