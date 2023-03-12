import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Button } from '@mui/material';
import AddMessageDialog from './components/AddMessageDialog';
import NotistackProvider from './components/NotistackProvider';

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
        <div>
          <Button
            onClick={() => {
              handleOpenAddMessageDialog();
            }}
          >
            Add a Message
          </Button>
          <AddMessageDialog
            open={openAddMessageDialog}
            onClose={handleCloseAddMessageDialog}
          />
        </div>
      </Provider>
    </NotistackProvider>
  );
}

export default App;
