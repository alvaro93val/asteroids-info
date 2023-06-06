// @ts-nocheck
import StarIcon from '@mui/icons-material/Star';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material';
import LoaderContext from 'context/Loader';
import asteroidImage from 'images/asteroids3.jpg';
import React, { useContext, useEffect, useState } from 'react';
import services from 'services/services';
import asteroidsSort from 'utils/functions';

const AsteroidInfo = (props) => {
  const [asteroid, setAsteroid] = useState();
  const [favorite, setFavorite] = useState(props.isFavorite);
  const { setShowLoader } = useContext(LoaderContext);

  const handleSaveFavorites = () => {
    // comprobate that there is a asteroid select
    if (props.asteroid) {
      // get asteroids favorites
      let asteroidsFavorites = JSON.parse(localStorage.getItem('asteroids'));
      if (!asteroidsFavorites) asteroidsFavorites = [];
      // if the asteroid select is favorite, comprobate his location
      if (favorite) {
        const indexDate = asteroidsFavorites.findIndex((af) => af.date === props.asteroid.date);
        if (indexDate !== -1) {
          const indexAsteroid = asteroidsFavorites[indexDate].asteroids.findIndex(
            (a) => a.id === props.asteroid.id
          );
          // if the asteroid is found, this will be deleted
          if (indexAsteroid !== -1) {
            asteroidsFavorites[indexDate].asteroids.splice(indexAsteroid, 1);
            // if in the date there is not asteroids, will be deleted the date
            if (asteroidsFavorites[indexDate].asteroids.length === 0) {
              asteroidsFavorites.splice(indexDate, 1);
            }
          }
        }
        setFavorite(false);
      } else {
        // first locate the date
        const index = asteroidsFavorites.findIndex((af) => af.date === props.asteroid.date);
        if (index === -1) {
          // if there is not date, create a new date
          asteroidsFavorites.push({
            date: props.asteroid.date,
            asteroids: [{ id: props.asteroid.id, name: props.asteroid.name }]
          });
        } else {
          // otherwise add asteroid in the date found
          asteroidsFavorites[index].asteroids.push({
            id: props.asteroid.id,
            name: props.asteroid.name
          });
        }
        setFavorite(true);
      }

      localStorage.setItem('asteroids', JSON.stringify(asteroidsSort(asteroidsFavorites)));
    }
  };

  useEffect(() => {
    if (props.asteroid) {
      services
        .getAsteroidInfo(props.asteroid.id, props.asteroid.date)
        .then((data) => {
          setAsteroid(data.asteroidInfo);
          setShowLoader(false);
        })
        .catch((error) => {
          props.setErrorMessage(error.response?.data?.message ?? error.message);
          setShowLoader(false);
          props.setOpenSnackbar(true);
        });
    }
    return () => {
      setAsteroid(undefined);
    };
  }, [props.asteroid]);

  return (
    <div>
      {asteroid ? (
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="title"
          aria-describedby="description"
        >
          <DialogTitle id="title">{asteroid?.name}</DialogTitle>
          <DialogContent>
            <img
              src={asteroidImage}
              alt={'cover-'}
              width="500"
              height="400"
              style={{ backgroundColor: '#414141' }}
            />
            <DialogContentText id="date">{`Close approach date: ${asteroid?.date}`}</DialogContentText>
            <DialogContentText id="diameter">{`Estimated diameter: ${asteroid?.diameter}`}</DialogContentText>
            <DialogContentText id="distance">{`Miss distance: ${asteroid?.distance}`}</DialogContentText>
            <DialogContentText id="magnitude">{`Absolute magnitud: ${asteroid?.magnitude}`}</DialogContentText>
            <DialogContentText id="velocity">{`Relative velocity: ${asteroid?.velocity}`}</DialogContentText>
            <DialogContentText id="hazardous">{`Hazardous: ${
              asteroid?.hazardous ? 'Yes' : 'No'
            }`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Tooltip title="Save in favorites" placement="top">
              <IconButton aria-label="favorite" onClick={handleSaveFavorites}>
                <StarIcon color={favorite ? 'warning' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Button onClick={props.handleClose} autoFocus variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AsteroidInfo;
