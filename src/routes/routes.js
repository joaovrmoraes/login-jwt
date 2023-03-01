import { Router } from "express";
import Create from "../controllers/UserController.js";
import Auth from "../controllers/AuthController.js";
import authMiddleware from "../middlewares/jwt.middleware.js";
import { ListAll } from "../controllers/UserController.js";

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).send({ "msg": 'Server Status - Online' });
});

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