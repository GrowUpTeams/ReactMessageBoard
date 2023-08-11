import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../redux/slices/message';
import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function MessageItem({ message }) {
  return (
    <Box>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary={message.title} secondary={message.content} />
      </ListItem>
    </Box>
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
        {messages.length === 0 && isLoading && (
          <Typography>Loading...</Typography>
        )}
        <List sx={{ width: '100%' }}>
          {messages.map((message, i) => {
            const displayDivider = i < messages.length - 1;
            return (
              <Fragment>
                <MessageItem message={message} />
                {displayDivider && <Divider variant="inset" component="li" />}
              </Fragment>
            );
          })}
        </List>
      </Card>
    </Box>
  );
}

export default MessageTable;
