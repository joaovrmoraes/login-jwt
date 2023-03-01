import { config } from '../configs/jwtConfig.js'
import jwt from 'jsonwebtoken'

export default async function GenerateJWT(params = {}) {
  return jwt.sign(params, config.secret, {
    expiresIn: config.expiration
  })
}