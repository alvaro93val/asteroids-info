import axios from 'axios';

const urlLastAsteroids = `http://${process.env.HOST_BACKEND}:${process.env.PORT_BACKEND}/asteroid/last`;
const urlAsteroidsByDate = `http://${process.env.HOST_BACKEND}:${process.env.PORT_BACKEND}/asteroid/date`;
const ulrAsteroidInfo = `http://${process.env.HOST_BACKEND}:${process.env.PORT_BACKEND}/asteroid/info`;

const getLastAsteroids = async () => {
  const request = axios.get(urlLastAsteroids);
  return await request.then((response) => response.data).catch((error) => console.error(error));
};

const getAsteroidsByDate = async (startDate, endDate) => {
  const request = axios.get(`${urlAsteroidsByDate}?startDate=${startDate}&endDate=${endDate}`);
  return await request.then((response) => response.data).catch((error) => console.error(error));
};

const getAsteroidInfo = async (id, date) => {
  const request = axios.get(`${ulrAsteroidInfo}?id=${id}&date=${date}`);
  return await request.then((response) => response.data).catch((error) => console.error(error));
};

export default { getLastAsteroids, getAsteroidsByDate, getAsteroidInfo };
