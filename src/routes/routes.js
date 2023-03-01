import { Router } from "express";
import Create from "../controllers/UserController.js";
import Auth from "../controllers/AuthController.js";
import authMiddleware from "../middlewares/jwt.middleware.js";
import { ListAll } from "../controllers/UserController.js";

const routes = new Router();

/**
 * @api {get} / verification
 * @apiGroup Sistema
 *
 * @apiSuccess {String} Server Status - Online
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "msg": "Server Status - Online"
 *    }
 *
 */

routes.get('/', (req, res) => {
  res.status(200).send({ "msg": 'Server Status - Online' });
});

/**
 * @api {post} /user Create User
 * @apiGroup Sistema
 *
 * @apiSuccess {String}  Criado com sucesso
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 201 OK
 *     {
 *     mensagem: {
 *       "name": name,
 *       "email": email,
 *     }
 *   }
 *
 */

routes.post('/user', async (req, res, next) => {
  await authMiddleware(req, res, next, Create(req, res));
});

routes.get('/user', async (req, res, next) => {
  await authMiddleware(req, res, next, ListAll(req, res));
});


routes.post('/authentication', async (req, res) => {
  Auth(req, res);
})


export default routes;