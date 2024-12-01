import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import AddMessageDialog from './components/AddMessageDialog';
import NotistackProvider from './components/NotistackProvider';
import MessageTable from './components/MessageTable';

function App() {
  return (
    <NotistackProvider>
      <Provider store={store}>
        <div style={{ width: '100%', minHeight: '100vh' }}>
          <Container sx={{ my: 5 }}>
            <MessageTable />
          </Container>
        </div>
      </Provider>
    </NotistackProvider>
  );
}

export default App;
