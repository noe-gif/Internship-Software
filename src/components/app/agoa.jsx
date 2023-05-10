import React, { useEffect } from 'react';

import Home from 'src/containers/home/homeContainer';
import Login from 'src/containers/login/loginContainer';

import Loading from 'src/components/loading';

import agoaHook from 'src/hooks/app/agoaHook';

import 'src/App.css';

export default function Agoa(props) {
  const {
    tokenRequestAction,
    user,
  } = props;

  const {
    isLoading,
    updateUserAccessToken,
  } = agoaHook(tokenRequestAction);

  useEffect(() => {
    updateUserAccessToken();
  }, []);

  if (isLoading || user.isCurrentlyLoading) {
    return (
      <div className="loginContainer">
        <Loading />
      </div>
    );
  } else if (user.loggedIn && user.user !== undefined) {
    return (
      <Home />
    );
  } else {
    return (
      <Login />
    );
  }
}
