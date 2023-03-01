import jwt from 'jsonwebtoken';
import { config } from '../configs/jwtConfig.js';

export default async function authMiddleware(req, res, next, funcao) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).send({ error: 'Token format invalid' })
  }

  const parts = authorization.split(' ');

  if (!parts === 2) {
    return res.status(401).send({ error: 'Token format invalid' })
  }

  jwt.verify(authorization, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "Token invalid" })
    }

    req.id = decoded.id

    return funcao
  })
}