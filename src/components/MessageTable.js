import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../redux/slices/message';
import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MessageTableHeader from './MessageTableHeader';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function MessageItem({ message }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 5,
        margin: '15px 20px',
        bgcolor: 'rgba(249, 249, 249, 1)'
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={message.title}
          secondary={message.content}
          primaryTypographyProps={{ fontWeight: 'bold' }}
          secondaryTypographyProps={{ color: 'text.secondary' }}
        />
      </ListItem>
    </Card>
  );
}

function MessageTable({}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getMessages({ enqueueSuccess: () => null }));
  }, []);

  return (
    <Box className={classes.root}>
      <Card sx={{ mx: 2 }}>
        <MessageTableHeader />
        {messages.length === 0 && isLoading && (
          <Typography>Loading...</Typography>
        )}
        <List sx={{ width: '100%' }}>
          {messages.map((message, i) => {
            return (
              <Fragment>
                <MessageItem message={message} />
              </Fragment>
            );
          })}
        </List>
      </Card>
    </Box>
  );
}

export default MessageTable;
