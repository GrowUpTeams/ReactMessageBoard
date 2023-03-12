import { SnackbarProvider } from 'notistack';
import React from 'react';

function NotistackProvider({ children }) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}

export default NotistackProvider;
