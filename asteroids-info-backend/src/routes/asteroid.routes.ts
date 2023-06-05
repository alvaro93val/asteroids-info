import { Router } from 'express';
import { getAsteroidsByDate, getLastAsteroids, getOneAsteroidInfo } from '../controllers/asteroid.controller';

const asteroidRoute = Router();

asteroidRoute.route('/last').get(getLastAsteroids);
asteroidRoute.route('/date').get(getAsteroidsByDate);
asteroidRoute.route('/info').get(getOneAsteroidInfo);

export default asteroidRoute;
