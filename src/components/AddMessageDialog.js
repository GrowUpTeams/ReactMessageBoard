import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { createMessage, getMessages, hasError } from '../redux/slices/message';
import { LoadingButton } from '@mui/lab';

function AddMessageDialog(props) {
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, isLoading } = useSelector((state) => state.message);
  const [initialValues, setInitialValues] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(hasError(false));
    }
  }, [error, enqueueSnackbar, dispatch]);

  const MessageSchema = Yup.object().shape({
    title: Yup.string().required('content is required'),
    content: Yup.string().required('content is required')
  });

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: MessageSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await dispatch(
          createMessage({
            data: values,
            enqueueSuccess: () => {
              enqueueSnackbar('Successfully added', { variant: 'success' });
              dispatch(getMessages({}));
              resetForm();
              onClose();
            }
          })
        );
        setSubmitting(false);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setErrors({ afterSubmit: error.code });
        setSubmitting(false);
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    resetForm
  } = formik;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleConfirm = () => {
    handleSubmit();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add a Message</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2} m={2}>
              <TextField
                label={'Title'}
                variant="outlined"
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                rows={4}
                multiline
                label={'Content'}
                variant="outlined"
                {...getFieldProps('content')}
                error={Boolean(touched.content && errors.content)}
                helperText={touched.content && errors.content}
              />
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={isLoading} onClick={handleConfirm}>
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddMessageDialog;
