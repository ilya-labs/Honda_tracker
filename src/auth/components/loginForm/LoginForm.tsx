import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AlertForm,
  MyCheckbox,
  MyTextInput,
} from 'src/auth/components/loginForm/componentsForLoginForm';
import { Loading } from 'src/commonComponents/Loading';

import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { setCurrentUsername } from 'src/redux/userDataSlice';
import { calendarPath, initPath } from 'src/router/rootConstants';
import { useLazyStatusLoginQuery } from 'src/services/hondaApi';
import { authenticationManager } from 'src/auth/authenticationManager';
import { myLocalStorage } from 'src/services/localStorage';

import * as Yup from 'yup';
import 'src/css/App.css';

const LoginForm = () => {
  const [trigger, result] = useLazyStatusLoginQuery();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const isAuth = myLocalStorage.isAuth();

  useEffect(() => {
    if (isAuth) {
      navigate(calendarPath);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const { isSuccess, isError, errorMsg } =
      myRtkQueryResultProcessor.parseQueryResult(result);

    if (isSuccess) {
      authenticationManager.setAuthenticated(dispatch, username);
      dispatch(setCurrentUsername(username));
      setError('');
      navigate(calendarPath);
    }
    if (isError) {
      setError(errorMsg);
      myRtkQueryResultProcessor.handleErrorCode(result, dispatch);
      navigate(initPath);
    }
  }, [dispatch, navigate, result, username]);

  return (
    <div className="mainContainer ">
      {error && <AlertForm message={error} />}
      {result.isLoading ? (
        <Loading />
      ) : (
        <main className="flex flex-col justify-center items-center ">
          <div className="w-24 mb-4">
            <img
              src="https://www.nicepng.com/png/detail/138-1388174_login-account-icon.png"
              alt="logIn"
            />
            <h1 className="text-center">Sign in</h1>
          </div>
          <Formik
            initialValues={{
              login: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={Yup.object({
              login: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              let password = values.password;
              let username = values.login;
              trigger({ password, username });
              setUsername(username);
              setSubmitting(false);
            }}>
            <Form className="flex flex-col sm:w-96 space-y-3.5">
              <MyTextInput
                id={'outlined-login-input'}
                label={'Login'}
                type={'login'}
                autoComplete={'current-login'}
                name={'login'}
              />
              <MyTextInput
                id={'outlined-password-input'}
                label={'Password'}
                type={'password'}
                autoComplete={'current-password'}
                name={'password'}
              />
              <MyCheckbox name={'rememberMe'}>Remember me</MyCheckbox>
              <Button variant="contained" type="submit">
                {'Sign in'}
              </Button>
            </Form>
          </Formik>
        </main>
      )}
    </div>
  );
};

export default LoginForm;
