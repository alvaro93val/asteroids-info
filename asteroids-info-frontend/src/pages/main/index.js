import { Grid } from '@mui/material';
import CardMain from 'components/CardMain';
import Page from 'components/Page';
import LoaderContext from 'context/Loader';
import asteroidsList from 'images/asteroids1.jpg';
import asteroidsFavorite from 'images/asteroids2.jpg';
import React, { useContext, useEffect } from 'react';

const Main = () => {
  const { setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  }, []);

  return (
    <Page>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={4}>
          <CardMain
            title="Asteroids List"
            subtitle="Shows a list of asteroids defined by dates. If no date is set, this week's
                  asteroids will appear."
            image={asteroidsList}
            path="/asteroids"
          />
        </Grid>
        <Grid item xs={4}>
          <CardMain
            title="Favorite Asteroids"
            subtitle="Manage favorite asteroids. Save a list of asteroids."
            image={asteroidsFavorite}
            path="/favorites"
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Main;
