import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMessages } from '../redux/slices/message';

function MessageTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages({ enqueueSuccess: () => null }));
  }, []);
  return <div>MessageTable</div>;
}

export default MessageTable;
