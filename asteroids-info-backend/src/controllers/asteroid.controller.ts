import { Request, Response } from 'express';
import logger from '../logger';
import { getAsteroidInfo, getAsteroidsListByDate } from '../manager/asteroid.manager';
import { CodesResponses } from '../resources/enums/codesResponses.enum';

/** Function that controls the body that receives checking that data arrives
 *
 * @param {Request} _request object of the request
 * @param {Response} response object of the response
 * @returns {Promise<Response>} response with the result of the operation
 */
export async function getLastAsteroids(_request: Request, response: Response): Promise<Response> {
  try {
    const asteroidsListByDate = await getAsteroidsListByDate();

    // if all goes well return 200
    return response
      .status(CodesResponses.OK)
      .json({ success: true, message: 'OK', asteroidsListByDate: asteroidsListByDate });
  } catch (error) {
    logger.error(error.message);
    // if there is an error return a 400
    return response.status(CodesResponses.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
}

/** Function that controls the body that receives checking that data arrives
 *
 * @param {Request} request object of the request
 * @param {Response} response object of the response
 * @returns {Promise<Response>} response with the result of the operation
 */
export async function getAsteroidsByDate(request: Request, response: Response): Promise<Response> {
  try {
    // Check that the query arrives
    if (!request.query) throw new Error('There is no data in the query');
    const { startDate, endDate } = request.query;
    if (!startDate) throw new Error('Error start date');
    if (!endDate) throw new Error('Error end date');

    const asteroidsListByDate = await getAsteroidsListByDate(<string>startDate, <string>endDate);

    // if all goes well return 200
    return response
      .status(CodesResponses.OK)
      .json({ success: true, message: 'OK', asteroidsListByDate: asteroidsListByDate });
  } catch (error) {
    logger.error(error.message);
    // if there is an error return a 400
    return response.status(CodesResponses.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
}

/** Function that controls the body that receives checking that data arrives
 *
 * @param {Request} request object of the request
 * @param {Response} response object of the response
 * @returns {Promise<Response>} response with the result of the operation
 */
export async function getOneAsteroidInfo(request: Request, response: Response): Promise<Response> {
  try {
    // Check that the query arrives
    if (!request.query) throw new Error('There is no data in the query');
    const { id, date } = request.query;
    if (!id) throw new Error('Error asteroid ID');
    if (!date) throw new Error('Error date');

    const asteroidInfo = await getAsteroidInfo(<string>id, <string>date);

    // if all goes well return 200
    return response.status(CodesResponses.OK).json({ success: true, message: 'OK', asteroidInfo: asteroidInfo });
  } catch (error) {
    logger.error(error.message);
    // if there is an error return a 400
    return response.status(CodesResponses.BAD_REQUEST).json({
      success: false,
      message: error.message
    });
  }
}
