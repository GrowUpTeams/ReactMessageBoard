import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import AddMessageDialog from './components/AddMessageDialog';
import NotistackProvider from './components/NotistackProvider';
import MessageTable from './components/MessageTable';

function App() {
  const [openAddMessageDialog, setOpenAddMessageDialog] = useState();

  const handleOpenAddMessageDialog = () => {
    setOpenAddMessageDialog(true);
  };
  const handleCloseAddMessageDialog = () => {
    setOpenAddMessageDialog(false);
  };
  return (
    <NotistackProvider>
      <Provider store={store}>
        <div style={{ width: '100%', minHeight: '100vh' }}>
          <Container sx={{ my: 5 }}>
            <Stack
              spacing={1}
              sx={{ mx: 2, mb: 1 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Message Board</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  handleOpenAddMessageDialog();
                }}
              >
                Add a Message
              </Button>
            </Stack>
            <AddMessageDialog
              open={openAddMessageDialog}
              onClose={handleCloseAddMessageDialog}
            />
            <MessageTable />
          </Container>
        </div>
      </Provider>
    </NotistackProvider>
  );
}

export default App;
