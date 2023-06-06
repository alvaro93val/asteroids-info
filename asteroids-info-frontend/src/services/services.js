import axios from 'axios';

const HOST = process.env.REACT_APP_HOST_BACKEND;
const PORT = process.env.REACT_APP_PORT_BACKEND;

const urlLastAsteroids = `http://${HOST}:${PORT}/asteroid/last`;
const urlAsteroidsByDate = `http://${HOST}:${PORT}/asteroid/date`;
const ulrAsteroidInfo = `http://${HOST}:${PORT}/asteroid/info`;

const getLastAsteroids = () => {
  const request = axios.get(urlLastAsteroids);
  return request
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getAsteroidsByDate = async (startDate, endDate) => {
  const request = axios.get(`${urlAsteroidsByDate}?startDate=${startDate}&endDate=${endDate}`);
  return await request
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getAsteroidInfo = async (id, date) => {
  const request = axios.get(`${ulrAsteroidInfo}?id=${id}&date=${date}`);
  return await request
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export default { getLastAsteroids, getAsteroidsByDate, getAsteroidInfo };
