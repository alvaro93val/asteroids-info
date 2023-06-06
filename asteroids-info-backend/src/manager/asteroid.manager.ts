import { numberToString } from '../middleware/morgan.middleware';
import { Asteroid, AsteroidByDate, AsteroidInfo } from '../resources/dto/Asteroid.dto';
import { getAsteroidInfoService, getAsteroidsListService } from '../services/asteroid.service';

/**
 * Function that return the list of asteroids by dates or the las asteroids if dates is undefined
 * @param {string | undefined} startDate
 * @param {string | undefined} endDate
 * @returns {Promise<AsteroidList>} List of asteroids by dates or the last asteroids
 */
export async function getAsteroidsListByDate(startDate?: string, endDate?: string): Promise<AsteroidByDate[]> {
  const response = await getAsteroidsListService(dateFormat(startDate), dateFormat(endDate));
  const asteroidsByDate: AsteroidByDate[] = [];
  // first iterate by date, then by neo (Near Earth Object) and push in asteroids array
  for (const date in response.near_earth_objects) {
    const asteroids: Asteroid[] = [];
    for (const neo of response.near_earth_objects[date]) {
      asteroids.push({
        id: neo.id,
        name: neo.name
      });
    }
    asteroidsByDate.push({
      date: date,
      asteroids: asteroids
    });
  }
  // sort by date
  const asteroidsByDateSort = getAsteroidsSorted(asteroidsByDate);

  return asteroidsByDateSort;
}

/**
 * Function that return all information about an asteroid
 * @param {string} asteroidId identifier of an asteroid
 * @returns {Promise<AsteroidInfo>} information about an asteroid
 */
export async function getAsteroidInfo(asteroidId: string, date: string): Promise<AsteroidInfo> {
  const neo = await getAsteroidInfoService(asteroidId);
  const closeApproachDate = <string>dateFormat(date);
  const closeApproachDatum = neo.close_approach_data.find((d) => d.close_approach_date === closeApproachDate);
  if (!closeApproachDatum) {
    throw new Error(`The asteroid ${neo.id} has not been found to date ${closeApproachDate}`);
  }

  const asteroid: AsteroidInfo = {
    id: neo.id,
    name: neo.name,
    magnitude: neo.absolute_magnitude_h + ' H',
    diameter:
      neo.estimated_diameter.meters.estimated_diameter_min.toFixed() +
      '-' +
      neo.estimated_diameter.meters.estimated_diameter_max.toFixed() +
      ' m',
    hazardous: neo.is_potentially_hazardous_asteroid,
    date: closeApproachDate,
    velocity: round(closeApproachDatum.relative_velocity.kilometers_per_hour) + ' km/h',
    distance: round(closeApproachDatum.miss_distance.kilometers) + ' km'
  };

  return asteroid;
}

/**
 * Function that formats a date
 * @param {string | undefined} date Date to format
 * @returns {string | undefined} formatted date
 */
function dateFormat(date?: string): string | undefined {
  if (!date) return undefined;

  const newDate = new Date(date);
  const y = newDate.getFullYear();
  const m = numberToString(newDate.getMonth() + 1);
  const d = numberToString(newDate.getDate());

  return `${y}-${m}-${d}`;
}

/**
 * Function that parse and round a number
 * @param {string | undefined} number
 * @returns {string} number parsed and rounded
 */
function round(number: string | undefined): string {
  if (!number || isNaN(parseInt(number))) return 'Unknown';

  return parseInt(number).toString();
}

/**
 * function that sorts the list of asteroids according to date.
 * @param {AsteroidByDate[]} asteroidsByDate asteroids to sort
 * @returns {AsteroidByDate[]} asteroids sorted
 */
function getAsteroidsSorted(asteroidsByDate: AsteroidByDate[]): AsteroidByDate[] {
  return asteroidsByDate.sort((a, b) =>
    new Date(a.date).getTime() < new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() > new Date(b.date).getTime()
      ? 1
      : 0
  );
}
