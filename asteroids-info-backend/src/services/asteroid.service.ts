import axios from 'axios';
import { NearEarthObjectInfo } from '../resources/dto/NearEarthObjectInfo.dto';
import { NearEarthObjectList } from '../resources/dto/NearEarthObjectList.dto';

/**
 * Service that obtains the last asteroids list or by date
 * @returns {Promise<NearEarthObjectList>}
 */
export async function getAsteroidsListService(startDate?: string, endDate?: string): Promise<NearEarthObjectList> {
  let asteroids: NearEarthObjectList | undefined;
  const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY${
    startDate && endDate ? `&start_date=${startDate}&end_date=${endDate}` : ''
  }`;

  await axios
    .get(url)
    .then(function (response) {
      asteroids = response.data;
    })
    .catch(function (error) {
      throw error;
    });

  if (!asteroids) throw new Error('Data response is empty');

  return asteroids;
}

/**
 * Service that obtains the information about an asteroid
 * @returns {Promise<NearEarthObjectInfo>}
 */
export async function getAsteroidInfoService(asteroidId: string): Promise<NearEarthObjectInfo> {
  let asteroid: NearEarthObjectInfo | undefined;
  const url = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=DEMO_KEY`;

  await axios
    .get(url)
    .then(function (response) {
      asteroid = response.data;
    })
    .catch(function (error) {
      throw error;
    });

  if (!asteroid) throw new Error('Data response is empty');

  return asteroid;
}
