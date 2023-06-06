// @ts-nocheck
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Typography
} from '@mui/material';
import AsteroidInfo from 'components/AsteroidInfo';
import LoaderContext from 'context/Loader';
import React, { useContext, useEffect, useState } from 'react';

const Asteroids = (props) => {
  const [asteroid, setAsteroid] = useState();
  const [expanded, setExpanded] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const { setShowLoader } = useContext(LoaderContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSelectAsteroid = (date, id, name) => {
    setAsteroid({ date, id, name });
    setShowLoader(true);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setAsteroid(undefined);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    props.setOpenSnackbar(false);
  };

  const isFavorite = (id, date) => {
    const asteroidsFavorites = JSON.parse(localStorage.getItem('asteroids'));
    if (!asteroidsFavorites) return false;

    return asteroidsFavorites.find((af) => af?.date === date)?.asteroids.find((a) => a?.id === id);
  };

  useEffect(() => {}, []);

  return (
    <div>
      {props.asteroids.map((asteroidsByDate) => (
        <Accordion
          key={asteroidsByDate.date}
          expanded={expanded === asteroidsByDate.date}
          onChange={handleChange(asteroidsByDate.date)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={asteroidsByDate.date}
            id={asteroidsByDate.date}
          >
            <Typography>{asteroidsByDate.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} aria-label="asteroids">
              {asteroidsByDate.asteroids.map((ast) => (
                <ListItem key={ast.id} id={ast.id} aria-label={ast.id}>
                  <ListItemButton
                    onClick={() => handleSelectAsteroid(asteroidsByDate.date, ast.id, ast.name)}
                  >
                    <ListItemIcon>
                      <StarIcon
                        color={isFavorite(ast.id, asteroidsByDate.date) ? 'warning' : 'inherit'}
                      />
                    </ListItemIcon>
                    <ListItemText primary={ast.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
      {asteroid ? (
        <AsteroidInfo
          open={openPopup}
          handleClose={handleClosePopup}
          asteroid={asteroid}
          isFavorite={isFavorite(asteroid.id, asteroid.date)}
        />
      ) : (
        <></>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={props.openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Asteroids;
