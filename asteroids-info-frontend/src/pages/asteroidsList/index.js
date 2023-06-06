import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Asteroids from 'components/Asteroids';
import Page from 'components/Page';
import LoaderContext from 'context/Loader';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import services from 'services/services';

const AsteroidsList = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { setShowLoader } = useContext(LoaderContext);
  const [valueStart, setValueStart] = useState(dayjs(new Date()));
  const [valueEnd, setValueEnd] = useState(dayjs(new Date().setDate(new Date().getDate() + 7)));

  const handleSetDates = () => {
    setShowLoader(true);
    const startDate = valueStart.year() + '-' + (valueStart.month() + 1) + '-' + valueStart.date();
    const endDate = valueEnd.year() + '-' + (valueEnd.month() + 1) + '-' + valueEnd.date();

    services
      .getAsteroidsByDate(startDate, endDate)
      .then((data) => {
        setAsteroids(data.asteroidsListByDate);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        setErrorMessage(error.response?.data?.message ?? error.message);
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    services
      .getLastAsteroids()
      .then((data) => {
        setAsteroids(data.asteroidsListByDate);
        setShowLoader(false);
        setValueStart(dayjs(data.asteroidsListByDate[0].date));
        setValueEnd(dayjs(data.asteroidsListByDate[data.asteroidsListByDate.length - 1].date));
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? error.message);
        setShowLoader(false);
        setOpenSnackbar(true);
      });
  }, []);

  return (
    <Page>
      <Typography component="h3" variant="h3" align="center" color="text.primary" gutterBottom>
        ASTEROIDS LIST
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <DemoItem label="Start date">
            <DateCalendar value={valueStart} onChange={(newValue) => setValueStart(newValue)} />{' '}
          </DemoItem>
          <DemoItem label="End date">
            <DateCalendar value={valueEnd} onChange={(newValue) => setValueEnd(newValue)} />{' '}
          </DemoItem>
        </Grid>
      </LocalizationProvider>
      <Stack direction="row" justifyContent="center" marginBottom={2}>
        <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSetDates}>
          Search
        </Button>
      </Stack>
      <Asteroids
        asteroids={asteroids}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </Page>
  );
};

export default AsteroidsList;
