import React, { Fragment, useState } from 'react';
import { Button, CardHeader, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add as AddIcon } from '@mui/icons-material';
import AddMessageDialog from './AddMessageDialog';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function MessageTableHeader({}) {
  const [openAddMessageDialog, setOpenAddMessageDialog] = useState(false);

  const handleOpenAddMessageDialog = () => {
    setOpenAddMessageDialog(true);
  };
  const handleCloseAddMessageDialog = () => {
    setOpenAddMessageDialog(false);
  };

  return (
    <Fragment>
      <CardHeader
        title={<Typography variant="h5">📋 Message Board</Typography>}
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              handleOpenAddMessageDialog();
            }}
          >
            Add a Message
          </Button>
        }
      />
      <AddMessageDialog
        open={openAddMessageDialog}
        onClose={handleCloseAddMessageDialog}
      />
    </Fragment>
  );
}

export default MessageTableHeader;
