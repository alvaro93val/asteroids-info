import { Typography } from '@mui/material';
import Asteroids from 'components/Asteroids';
import Page from 'components/Page';
import React, { useContext, useEffect, useState } from 'react';

import LoaderContext from 'context/Loader';
import services from 'services/services';

const AsteroidsList = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    services
      .getLastAsteroids()
      .then((data) => {
        setAsteroids(data.asteroidsListByDate);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        setErrorMessage(error.message);
        setOpenSnackbar(true);
      });
  }, []);

  return (
    <Page>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        ASTEROIDS LIST
      </Typography>
      <Asteroids
        asteroids={asteroids}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        errorMessage={errorMessage}
      />
    </Page>
  );
};

export default AsteroidsList;
