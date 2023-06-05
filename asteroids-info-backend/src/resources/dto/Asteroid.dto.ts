/**
 * AsteroidByDate
 * @alias AsteroidByDate
 * @typedef AsteroidByDate
 */
export interface AsteroidByDate {
  date: string;
  asteroids: Asteroid[];
}
/**
 * Asteroid
 * @alias Asteroid
 * @typedef Asteroid
 */
export interface Asteroid {
  id: string;
  name: string;
}
/**
 * AsteroidInfo
 * @alias AsteroidInfo
 * @typedef AsteroidInfo
 */
export interface AsteroidInfo extends Asteroid {
  magnitude: string;
  diameter: string;
  hazardous: boolean;
  date: string;
  velocity: string;
  distance: string;
}
