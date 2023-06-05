import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import { LoaderProvider } from 'context/Loader';
import AsteroidsFavorites from 'pages/asteroidsFavorites';
import AsteroidsList from 'pages/asteroidsList';
import Main from 'pages/main';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const defaultTheme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <LoaderProvider>
          <Routes>
            <Route element={<Header />}>
              <Route path="/" element={<Main />} />
              <Route path="/asteroids" element={<AsteroidsList />} />
              <Route path="/favorites" element={<AsteroidsFavorites />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Footer />
        </LoaderProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
