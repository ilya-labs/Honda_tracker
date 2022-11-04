import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import LoginForm from 'src/auth/components/loginForm/LoginForm';

export const App = () => {
  return (
    <main className={'mainContainer'}>
      <ScrollRestoration
        getKey={(location, matches) => {
          // default behavior
          console.log('locationKey', location.pathname);
          return location.key;
        }}
      />
      <LoginForm />
    </main>
  );
};
