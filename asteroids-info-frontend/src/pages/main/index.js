import { Grid } from '@mui/material';
import CardMain from 'components/CardMain';
import Page from 'components/Page';
import asteroidsList from 'images/asteroids1.jpg';
import asteroidsFavorite from 'images/asteroids2.jpg';
import React from 'react';

const Main = () => {
  return (
    <Page>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={6}>
          <CardMain
            title="Asteroids List"
            subtitle="Shows a list of asteroids defined by dates. If no date is set, this week's
                  asteroids will appear."
            image={asteroidsList}
            path="/asteroids"
          />
        </Grid>
        <Grid item xs={6}>
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
