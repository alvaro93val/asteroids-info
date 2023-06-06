import { Typography } from '@mui/material';
import Asteroids from 'components/Asteroids';
import Page from 'components/Page';
import React, { useContext, useEffect, useState } from 'react';

import LoaderContext from 'context/Loader';

const AsteroidsFavorites = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    const asteroidsFavorites = JSON.parse(localStorage.getItem('asteroids'));
    setTimeout(() => {
      setShowLoader(false);
      if (!asteroidsFavorites || asteroidsFavorites.length === 0) {
        setErrorMessage('There are no saved favorite asteroids yet.');
        setOpenSnackbar(true);
      }
      setAsteroids(asteroidsFavorites);
    }, 500);
  }, []);

  return (
    <Page>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        ASTEROIDS FAVORITES
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

export default AsteroidsFavorites;
